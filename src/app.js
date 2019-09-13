require("dotenv").config();

const config = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sanitizer = require("express-sanitizer");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const GeoJSON = require("geojson");
const passport = require("passport");
const M_OV = require("method-override"); // TODO: not sure if this is needed.
const mbxClient = require("@mapbox/mapbox-sdk");
const mbxStyles = require("@mapbox/mapbox-sdk/services/styles");
const mbxTilesets = require("@mapbox/mapbox-sdk/services/tilesets");
const mbxDatasets = require("@mapbox/mapbox-sdk/services/datasets");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const routes = require("./routes");

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
app.use(
  session({
    secret: config.app.sessionSecret,
    resave: false,
    saveUninitialized: false
  })
);

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
app.use(logger(config.app.env === "development" ? "dev" : "tiny"));

/* Point to stylesheets in ./public */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

/* We'll use sanitizer for our inputs before we add them to our database */
app.use(sanitizer());

/* We'll use method override for DELETE, PUT, EDIT requests ! */
app.use(M_OV("_method"));

/* Start mongoose and make sure database is connected */
mongoose
  .connect(
    `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log(`Connected to ${config.db.host}/${config.db.name}`))
  .catch(err => console.error(err));

//app.use("/",      routes.indexRoutes);
//app.use("/auth",  routes.authRoutes);
//app.use("/map",   routes.mapRoutes)

app.get("*", (req, res) => res.render("pages/error"));

app.listen(config.app.port, () =>
  console.log(
    `App is listening on port http://localhost:${config.app.port} \n Running in ${config.app.env} mode.`
  )
);

module.exports = app;
