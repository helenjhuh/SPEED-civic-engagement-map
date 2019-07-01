require("dotenv").config();
process.setMaxListeners(0);

const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  sanitizer = require("express-sanitizer"),
  M_OV = require("method-override"),
  GeoJSON = require("geojson"),
  User = require("./models/user.js");
  geoUser = require("./models/geoUser.js"),
  passport = require("passport"),
  session = require("express-session");

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

app.set("view engine", "ejs");

/* Point to stylesheets in ./public */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* We'll use sanitizer for our inputs before we add them to our database */
app.use(sanitizer());

/* We'll use method override for DELETE, PUT, EDIT requests ! */
app.use(M_OV("_method"));

/* Start mongoose and make sure database is connected */
//const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/cem-data`;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-hytar.gcp.mongodb.net/test?retryWrites=true&w=majority`;

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

app.get("/", (req, res) => {
  res.render("pages/landing");
});

app.get("/cem_map", (req, res) => {
  /* Get all of the geoJSON representations of user information
   * and render our pages/index which should have all of our markers
   * for each one of those users.
   */

  geoUser.find({}, (err, geoUsers) => {
    //render our pages/index but pass in all of our geoUsers as users
    err
      ? res.redirect("pages/error")
      : res.render("pages/index", { users: JSON.stringify(geoUsers) });
  });
});

/* POST ROUTE */
app.post("/cem_map", (req, res) => {
  //create a new post and then redirect to our index page
  //first we need to create a geoJson object that we can put to our dataset?

  //TODO: 1) Figure out whether we want to grab location in the form and then just pass that
  //         in to geocoder along with our form data?

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
        if (err) {
          res.render("pages/error");
        } else {
          res.redirect("/cem_map");
        }
      });
    })
    .catch(err => console.log(err));
});

/* CREATE ROUTE */
app.get("/cem_map/new", (req, res) => {
  res.render("pages/new");
});

/* CATCH ALL OF OTHER REQUESTS THAT AREN'T ANY OF THE ABOVE */

/* ==========================================================
 *
 *             READ MORE ABOUT A SPECIFIC POST ROUTES
 *
 *TODO: Figure out login/sign-up routes...
  TODO: Add routing for a read more about a specific pin...
  TODO: Should have edit and delete options...
 *
 * ==========================================================
 *
 */

app.get("*", (req, res) => {
  res.render("pages/error");
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("CeM app server started");
});
