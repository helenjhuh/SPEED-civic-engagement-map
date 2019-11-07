require("dotenv").config();

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const apiRoutes = require("./routes/api");

// Require the db
require("./mongoose");

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

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up passport
require("./middleware/passport")(passport);
app.use(passport.initialize(null));
app.use(passport.session());

// Use logger
app.use(logger("dev"));

app.use(cors());

app.use("/api/auth", apiRoutes.authRoutes);
app.use("/api/users", apiRoutes.userRoutes);
app.use("/api/pins", apiRoutes.pinRoutes);
app.use("/api/projects", apiRoutes.projectRoutes);
app.use("/api/roles", apiRoutes.roleRoutes);
app.use("/api/mapbox", apiRoutes.mapboxRoutes);
app.use("/api/addresses", apiRoutes.addressRoutes);

app.listen(config.app.port, () =>
  console.log(
    `App is listening on port http://localhost:${config.app.port} \nRunning in ${config.app.env} mode.`
  )
);

module.exports = app;
