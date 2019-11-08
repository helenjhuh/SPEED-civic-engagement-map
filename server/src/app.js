require("dotenv").config();

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");

// Initialize some of the variables we will need
let app, gfs;

// Initialize mongoose and the db connection
const dbURI = `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`;
mongoose.connect(dbURI, { useNewUrlParser: true });
const conn = mongoose.connection;

const storage = new gridFsStorage({
  db: conn,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // TODO: Check the file mime type here, we only want to accept images
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

conn.once("open", () => {
  // Set up GridFs
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

  /* Begin initialization for our app and set up stuff */
  app = express();

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
  app.use("/api/files", apiRoutes.fileRoutes);

  app.listen(config.app.port, () =>
    console.log(
      `App is listening on port http://localhost:${config.app.port} \nRunning in ${config.app.env} mode.`
    )
  );
});

conn.once("error", err => {
  console.log.bind(err);
});

module.exports = { app, gfs, upload };
