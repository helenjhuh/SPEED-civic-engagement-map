require("dotenv").config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import sanitizer from "express-sanitizer";
import session from "express-session";
import path from "path";
import logger from "morgan";
import GeoJSON from "geojson";

import config from "./config";

//process.setMaxListeners(0);
// const express = require("express"),
//       mongoose = require("mongoose"),
//       bodyParser = require("body-parser"), sanitizer = require("express-sanitizer"),
//       M_OV = require("method-override"),
//       GeoJSON = require("geojson"),
//      User = require("./models/user.js");
//   geoUser = require("./models/GeoJson.js"),
//   passport = require("passport"),
//   session = require("express-session"),
//   path = require("path"),
//   logger = require("morgan");

/* Share a base client with multiple services with mapbox*/
const mbxClient = require("@mapbox/mapbox-sdk");
const mbxStyles = require("@mapbox/mapbox-sdk/services/styles");
const mbxTilesets = require("@mapbox/mapbox-sdk/services/tilesets");
const mbxDatasets = require("@mapbox/mapbox-sdk/services/datasets");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

/* Initialize our base client with our token */
const baseClient = mbxClient({ accessToken: config.mapbox.apiToken });
const stylesService = mbxStyles(baseClient);
const tilesetsService = mbxTilesets(baseClient);
const datasetsService = mbxDatasets(baseClient);
const geocodingService = mbxGeocoding(baseClient);

/* Begin initialization for our app and set up stuff */
const app = express();

// configure express session -- This is required for a persistant logon
// with passport. If we switch to something like token-based authentication
// we can remove this
app.use(session({
  secret: config.app.sessionSecret,
  resave: false,
  saveUninitialized: false 
}));

// require passport as a middleware of express
require("./middleware/passport")(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
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
const uri = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`;
mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => console.log("Connection successful"))
  .catch(err => console.log(err));
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Include auth routes
app.use("/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", (req, res) => {
    res.render("pages/landing");
});

app.get("/home/about", (req, res) => {
    res.render("pages/about");
});

app.get("/home/faq", (req, res) => {  
    res.render("pages/faq");
});

/* Here we're going to show the specific information for a user
* we can pass in our req.user as an object because it contains all of
* the information of an account owner already
*/
app.get("/home/account/:id", isLoggedIn, (req, res) => {
    res.render("pages/account", { currUser: req.user});
});

app.get("/home/account/:id/edit", isLoggedIn, (req, res) => {
    let result = [];
    geoUser.find({
        '_id': {$in: 
            req.user.usersPins
        }
    }, (err, docs) => {
        err ? res.redirect('pages/error') : res.render('pages/manage_pins', {pins: docs});
    });
});


/* Get all of the geoJSON representations of user information
* and render our pages/index which should have all of our markers
* for each one of those users.
*/
app.get("/cem_map", (req, res) => {
  geoUser.find({}, (err, pinGeo) => {
    err ? res.redirect("pages/error") : res.render("pages/index", { users: JSON.stringify(pinGeo) });
  });
});

/* 
* If a user is logged in then redirect them to our post page and have them fill out that form.
* but, if the user isn't logged in then they can't add a pin.
*
* We need to convert the form that the user inputted into geoJson and send it off to Mapbox Geocoding service.
* We also need to save that geoJson object to our database so it can render on our map and we need to link that geoJson
* to the user that posted it to the map.
*/
app.post("/cem_map", isLoggedIn, (req, res) => {
    /*Try A search*/
    geocodingService
    .forwardGeocode({
        query: "Searchable"
    })
    .send()
    .then(response => {
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

    /* Get the owner of this pin */
    geoUser.findById(req.params.id).exec((err, found) => {
        if(err) res.render("pages/error");

        /*Access the owner field and grab the users id*/
        User.findById(found.properties.owner.id, (err, thisUser) => {
            if(err) {
                res.redirect("pages/error");
            } else {
                
                /* After finding user we can update their fields */
                User
                .updateOne(
                    {_id: thisUser._id},
                    { $pull: { usersPins: { $in: [req.params.id] }}}
                )

                /* Delete was successful if we reach then so we can remove it from our geoUser*/
                .then( () => successfulDeleteBlock() )
                .catch( (err) => res.redirect("pages/error"));

                function successfulDeleteBlock() {
                    geoUser.findByIdAndRemove(req.params.id, (err) => {
                        (err) ? res.redirect("pages/error") : res.redirect("/");
                    });
                };
            };
        });

    });
});

app.get("*", (req, res) => {
  res.render("pages/error");
});

/* MIDDLEWARE */
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.render("pages/auth/login");
};

function checkOwner(req, res, next) {

    /*Check if user is logged in... */
    if(req.isAuthenticated()) {
        /*If user is logged in does the user own the pin?*/
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

app.listen(config.app.port, () => console.log(`App is listening on port ${config.app.port}`));
