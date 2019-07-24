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

app.use( (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


// Include auth routes
app.use("/auth", require("./routes/auth"));

//ROOT REDIRECTS TO HOME
app.get("/", (req, res) => {
    res.redirect("/home");
});

//HOME ROUTE
app.get("/home", (req, res) => {

    res.render("pages/landing");

});

//SHOW ACCOUNT WE'LL BE ABLE TO MANAGE PINS HERE EVENTUALLY!
app.get("/home/account/:id", (req, res) => {

    console.log(req.user);
    res.render("pages/account");
});

/* Show the map */
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
    


    /*Try A search*/
    geocodingService
    .forwardGeocode({
        query: "Searchable"
    })
    .send()
    .then(response => {
        console.log(response);
    });
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
        project_type: req.body.project,
        description: req.body.description,
        project_website: req.body.project_website,
        img: req.body.img,
        building: req.body.building,
        room_number: req.body.room_number,
        community_partners: req.body.community_partners,
        project_mission: req.body.project_mission,
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0]
      };

      temp = GeoJSON.parse(temp, { Point: ["lat", "lng"] });
      geoUser.create(temp, (err, newPin) => {
          
          /* Here we're linking that geoJson post with the account it was made from */
          newPin.properties.owner.id = req.user._id;
          newPin.properties.owner.username = req.user.email;
          newPin.properties.self._id = newPin._id;

          /* Make sure this pin is added to the owners collection of pins */
          User.
              findById(req.user._id).
              populate('usersPins'). 
              exec( (error, ele) => {
                  if(error) {
                      res.render("pages/error");
                  } else {
                      ele.usersPins.push(newPin._id);
                      ele.save();
                  }
              });

          newPin.save();

          (err) ? res.render("pages/error") : res.redirect("/cem_map");
      });
    })
    .catch(err => console.log(err));
});

/* CREATE ROUTE */
app.get("/cem_map/new", isLoggedIn, (req, res) => {
  res.render("pages/new");
});

//Show info about a pin route
app.get("/cem_map/:id", (req, res) => {

    // res.render("pages/show", {thisPin: found});
    geoUser.findById(req.params.id).exec( (err, found) => {
        (err) ? res.render("pages/error") : res.render("pages/show", {thisPin: found});
    });

});

//EDIT ROUTE
app.get("/cem_map/:id/edit", checkOwner, (req, res) => {

    geoUser.findById(req.params.id).exec( (err, found) => {
        res.render("pages/edit", {thisPin: found});
    });

    /*If not we're gonna redirect*/

});


//UPDATE A PIN ROUTE
app.put("/cem_map/:id", checkOwner, (req, res) => {

    let newPin = {
        'properties.title': req.body.title,
        'properties.project_type': req.body.project_type,
        'properties.description': req.body.description,
        'properties.project_website': req.body.project_website,
        'properties.img': req.body.img,
        'properties.building': req.body.building,
        'properties.room_number': req.body.room_number,
        'properties.community_partners': req.body.community_partners,
        'properties.project_mission': req.body.project_mission
    };

    geoUser.findByIdAndUpdate(
        req.params.id, 
        { $set: newPin},
        {new: true},
        (err, updatedPin) => {
            (err) ? res.redirect("pages/error") : res.redirect("/cem_map/" + req.params.id);
    });

});

//SHOW ACCOUNT PAGE
app.get("/cem_map/account/:id", checkOwner, (req, res) => {

    res.send("Show accounts page!");

});

//DESTROY A PIN
app.delete("/cem_map/:id", checkOwner, (req, res) => {

    // We also need to remove this object from this owners userPins field!

    /* Get the owner of this pin */
    geoUser.findById(req.params.id).exec((err, found) => {
        if(err) {
            res.render("pages/error");
        } else {
            /*Access the owner field and grab the users id*/
            User.findById(found.properties.owner.id, (err, thisUser) => {
                if(err) {
                    res.redirect("pages/error");
                } else {
                    
                    /*Access usersPins and remove the reference to this pins id*/
                    for(let i=0; i<thisUser.usersPins.length; i++) {

                        /* If the object id at usersPins[i] is the same as req.params.id remove it */
                        if(thisUser.usersPins[i].equals(req.params.id)) {
                            console.log("OBJECT ID HERE IS: ", thisUser.usersPins[i]);
                            console.log("OBJECT ID WE WANT TO DELETE: ", req.params.id);
                            thisUser.usersPins = thisUser.usersPins.slice(0, i).concat(thisUser.usersPins.slice(-i));
                        }
                    }
                    
                    /*And now we can finally delete that pin from geoUser*/
                    geoUser.findByIdAndRemove(req.params.id, (err) => {
                        (err) ? res.redirect("pages/error") : res.redirect("/");
                    });
                }
            });
        }
    });

});

app.get("*", (req, res) => {
  res.render("pages/error");
});

/* MIDDLEWARE */
function isLoggedIn(req, res, next) {

    if(req.isAuthenticated()) {
        return next();
    }

    res.render("pages/auth/login");
};

function checkOwner(req, res, next) {

    /*Check if user is logged in... */
    if(req.isAuthenticated()) {
        /*If user is logged in does the user own the campground?*/
        geoUser.findById(req.params.id).exec( (err, found) => {
           if (err) { 
               res.redirect("back");
           } else {
               if(found.properties.owner.id.equals(req.user._id)) {
                   next();
               } else {
                   res.redirect("back");
               }
           }
        });
    } else {
        res.redirect("back");
    }
};

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("CeM app server started");
});
