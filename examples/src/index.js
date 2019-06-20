require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const mbxClient = require("@mapbox/mapbox-sdk");
const mbxGeocode = require("@mapbox/mapbox-sdk/services/geocoding");
const accessToken = process.env.MBOX_API_KEY;

const baseClient = mbxClient({ accessToken });
const geocodingService = mbxGeocode(baseClient);

// Set up the view engine to use pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

/**
 * @description Renders the home page. The user can search for a place on this page.
 */
app.get("/", (req, res) => {
  res.render("home");
});

/**
 * @description Uses the mapbox API to geocode a string into coordinates. The script
 * redirects the user to the map page with the found coordinates.
 */
app.get("/geocode", (req, res) => {
  const { place } = req.query;

  if (!place) {
    res.render("error", {
      error: "Invalid request. Missing place string in query string."
    });
  } else {
    geocodingService
      .forwardGeocode({
        query: place,
        limit: 1
      })
      .send()
      .then(response => {
        const results = response.body.features;
        const center = results[0].center;
        res.redirect(`/map?center=${center}&key=${accessToken}`);
      })
      .catch(err => {
        console.error(err);
        res.render("error", { error: err.toString() });
      });
  }
});

/**
 * @description Renders the map page.
 *
 * note: pass key= and center=lat,lng in query string
 */
app.get("/map", (req, res) => {
  res.render("map");
});

app.listen(9000, () => {
  console.log("Listening on port 9000");
});
