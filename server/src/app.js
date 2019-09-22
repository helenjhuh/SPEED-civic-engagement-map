require("dotenv").config();

const config = require("./config");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sanitizer = require("express-sanitizer");
const session = require("express-session");
const logger = require("morgan");
const GeoJSON = require("geojson");
const passport = require("passport");
const cors = require("cors");

const apiRoutes = require("./routes/api");

/* Begin initialization for our app and set up stuff */
const app = express();

// configure express session -- This is required for a persistant logon
// with passport. If we switch to something like token-based authentication
// we can remove this
app.use(
  session({
    secret: config.app.sessionSecret,
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up passport
require("./middleware/passport")(passport);

app.use(passport.initialize(null));
app.use(passport.session());

// Use logger
app.use(logger("dev"));

/* Point to stylesheets in ./public */
//app.use(express.static("public"));

app.use(cors());

app.use("/api/auth", apiRoutes.authRoutes);
app.use("/api/users", apiRoutes.userRoutes);
app.use("/api/pins", apiRoutes.pinRoutes);
app.use("/api/projects", apiRoutes.projectRoutes);
app.use("/api/roles", apiRoutes.roleRoutes);
app.use("/api/mapbox", apiRoutes.mapboxRoutes);
app.use("/api/addresses", apiRoutes.addressRoutes);

//app.use((req, res, next) => {
//  res.locals.currentUser = req.user;
//  next();
//});

// configure ejs as the view engine and set the views directory
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

/* We'll use sanitizer for our inputs before we add them to our database */
//app.use(sanitizer());

// /* We'll use method override for DELETE, PUT, EDIT requests ! */
// app.use(M_OV("_method"));

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

//app.get("*", (req, res) => res.render("pages/error"));

app.listen(config.app.port, () =>
  console.log(
    `App is listening on port http://localhost:${config.app.port} \nRunning in ${config.app.env} mode.`
  )
);

module.exports = app;
