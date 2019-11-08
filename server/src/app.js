require("dotenv").config();

const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const gridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const grid = require("gridfs-stream");
const multer = require("multer");
const { SendSuccess, SendError, SendFailure } = require("./helpers/responses");
const { Types } = require("mongoose");
const { Project } = require("./models");
const methodOverride = require("method-override");

// Initialize some of the variables we will need
let app;

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
  // Set up gfs
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

  app.use(methodOverride("_method"));

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

  // Set up the file routes here until we can figure out how to pass around the gfs instance
  app.get("/api/files", (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (err) {
        SendError(res, 500, err);
      }
      res.json({ files });
    });
  });

  /**
   * @route /api/projects/:id/upload
   * @description Adds a photo to a project
   * @param :id The project id to upload the photo to
   */
  app.post(
    "/api/projects/:id/upload",
    upload.array("photos", 12),
    (req, res) => {
      const { id } = req.params;

      // If the project has an invalid id, don't bother to proceed
      if (!Types.ObjectId.isValid(id) || !id)
        return SendFailure(res, 400, en_US.BAD_REQUEST);

      const mapped = req.files.map(file => file.filename);

      // Retrieve the project, and save the photo's id to it
      Project.update({ _id: id }, { $push: { photos: [...mapped] } }, err => {
        if (err) {
          SendError(res, 500, error);
        }
        SendSuccess(res, 200, { message: "Upload success" });
      });
    }
  );

  /**
   * @route /api/files/:hash
   * @description Get a photo by hash
   * @param hash
   */
  app.get("/api/files/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return SendFailure(res, 404, "File does not exist");
      }
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        return SendFailure(res, 404, "Not an image!");
      }
    });
  });

  /**
   * @route /api/projects/:projectid/:photohash/delete
   * @description Delete a photo by it's hash
   * @param projectid
   * @param photohash
   */
  app.delete("/api/projects/:projectid/:filename/delete", (req, res) => {
    // first lets find the project
    Project.findOne({ _id: req.params.projectid }, (err, project) => {
      if (err) {
        return SendError(res, 500, err);
      }
      // once we have the project, we need to remove the photohash from it's photos array
      project.photos = project.photos.filter(
        photo => photo != req.params.filename
      );

      project.save(err => {
        if (err) {
          return SendError(res, 500, err);
        }
        // before we save the project, let's remove the photo from the storage as well
        gfs.remove({ filename: req.params.filename }, (err, gridStore) => {
          if (err) {
            return SendError(res, 500, err);
          }
          return SendSuccess(res, 200, { message: "File deleted" });
        });
      });
    });
  });

  app.listen(config.app.port, () =>
    console.log(
      `App is listening on port http://localhost:${config.app.port} \nRunning in ${config.app.env} mode.`
    )
  );
});

conn.once("error", err => {
  console.log.bind(err);
});

module.exports = { app, storage };
