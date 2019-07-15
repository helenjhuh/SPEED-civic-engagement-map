require("dotenv").config();
process.setMaxListeners(0);

const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  sanitizer = require("express-sanitizer"),
  M_OV = require("method-override"),
  GeoJSON = require("geojson"),
  User = require("./models/user.js");
  geoUser = require("./models/GeoJson.js"),
  passport = require("passport"),
  session = require("express-session"),
  path = require("path"),
  logger = require("morgan");

/* Share a base client with multiple services with mapbox*/
const mbxClient = require("@mapbox/mapbox-sdk"),
  mbxStyles = require("@mapbox/mapbox-sdk/services/styles"),
  mbxTilesets = require("@mapbox/mapbox-sdk/services/tilesets"),
  mbxDatasets = require("@mapbox/mapbox-sdk/services/datasets");
  mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

/* Initialize our base client with our token */
const baseClient = mbxClient({ accessToken: process.env.CEM_ID }),
  stylesService = mbxStyles(baseClient),
  tilesetsService = mbxTilesets(baseClient);
  datasetsService = mbxDatasets(baseClient);
  geocodingService = mbxGeocoding(baseClient);

/* Begin initialization for our app and set up stuff */
const app = express();

// configure express session -- This is required for a persistant logon
// with passport. If we switch to something like token-based authentication
// we can remove this
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false 
}));

// require passport as a middleware of express
require("./middleware/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// configure ejs as the view engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use logger
app.use(logger(process.env.NODE_ENV === "development" ? "dev" : "tiny"));

/* Point to stylesheets in ./public */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* We'll use sanitizer for our inputs before we add them to our database */
app.use(sanitizer());

/* We'll use method override for DELETE, PUT, EDIT requests ! */
app.use(M_OV("_method"));

/* Start mongoose and make sure database is connected */
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST}
/cem-data`;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connection successful"))
  .catch(err => console.log(err));

mongoose.set("useCreateIndex", true);

/* =========================
 * RESTful routes to build
 *
 * INDEX        GET         /cem_map         Display our map and current pins that it has
 * CREATE       POST        /cem_map         Add a new pin to our map page and render it
 * NEW          GET         /cem_map/new     Display our form to add the content of a pin
 * =========================
 */

/*
 * Need to render a map that has a dataset of all of the users in our map.
 *
 * We need a map with a dataset of geoJSON features that are pins which contain
 * the form data we got from app.post"/cem_map"...
 *
 * Create a dataset... POST request to /datasets/v1/{cem-v1}
 *                     Response will be a new, empty dataset.
 *
 *  For now, lets just try to create a pin on a map with some information
 *
 *
 */

// Include auth routes
app.use("/auth", require("./routes/auth"));

 app.get("/", (req, res) => {
  res.render("pages/landing");
});

app.get("/cem_map", (req, res) => {

  /* Get all of the geoJSON representations of user information
   * and render our pages/index which should have all of our markers
   * for each one of those users.
   */

  geoUser.find({}, (err, pinGeo) => {
    
    err ? res.redirect("pages/error") : res.render("pages/index", { users: JSON.stringify(pinGeo) });

  });
});

/* POST ROUTE */
app.post("/cem_map", isLoggedIn, (req, res) => {


    /* 
     * If a user is logged in then redirect them to our post page and have them fill out that form.
     * but, if the user isn't logged in then they can't add a pin.
     *
     * We need to convert the form that the user inputted into geoJson and send it off to Mapbox Geocoding service.
     * We also need to save that geoJson object to our database so it can render on our map and we need to link that geoJson
     * to the user that posted it to the map.
     */

  /* BUILD OUR ADDRESS */
  let this_address = req.body.address.concat(
    " ",
    req.body.city,
    ",",
    " ",
    req.body.state,
    " ",
    req.body.zip,
    " ",
    req.body.country
  );

  /* GET THE USERS ADDRESS AND QUERY GEOCDOING SERVICES FOR LNG,LAT */
  geocodingService
    .forwardGeocode({
      query: this_address,
      limit: 2
    })
    .send()
    .then(response => {
      /* Grab the coordinates based on our query from here and begin to constuct geoJSON object */


      let temp = {
        title: req.body.title,
        description: req.body.description,
        contact: req.body.contact,
        contact_email: req.body.contact_email,
        community_partners: req.body.community_partners,
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0]
      };

      temp = GeoJSON.parse(temp, { Point: ["lat", "lng"] });
      geoUser.create(temp, (err, success) => {
          
          /* Here we're linking that geoJson post with the account it was made from */
          success.properties.owner.id = req.user._id;
          success.properties.owner.username = req.user.email;
          success.properties.self._id = success._id;

          /* Make sure this pin is added to the owners collection of pins */
          User.
              findById(req.user._id).
              populate('usersPins'). 
              exec( (error, ele) => {
                  if(error) {
                      res.render("pages/error");
                  } else {
                      ele.usersPins.push(success._id);
                      ele.save();
                  }
              });

          success.save();

          (err) ? res.render("pages/error") : res.redirect("/cem_map");
      });
    })
    .catch(err => console.log(err));
});

/* CREATE ROUTE */
app.get("/cem_map/new", isLoggedIn, (req, res) => {
  res.render("pages/new");
});

/* CATCH ALL OF OTHER REQUESTS THAT AREN'T ANY OF THE ABOVE */

/* ==========================================================
 *
 *             READ MORE ABOUT A SPECIFIC POST ROUTES
 *
 *TODO: Add routing for updating and destroying pins
  TODO: Add routing for a read more about a specific pin...
  TODO: Should have edit and delete options...
 *
 * ==========================================================
 *
 */

//Display a pins information route
app.get("/cem_map/:id", (req, res) => {

    res.send("DISPLAY A PIN ROUTE");
});


//UPDATE PIN ROUTE

app.get("*", (req, res) => {
  res.render("pages/error");
});

/* Middleware for preventing users who aren't logged in from adding pins to the map */
function isLoggedIn(req, res, next) {

    if(req.isAuthenticated()) {
        return next();
    }

    res.render("pages/auth/login");
}

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("CeM app server started");
});
