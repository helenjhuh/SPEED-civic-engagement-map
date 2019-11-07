const config = require("./config");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const gridFs = require("gridfs-stream");
const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");

// Start mongoose and make sure database is connected before starting the server
const dbURI = `mongodb+srv://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.name}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

// Init gfs
let gfs;

conn.once("open", () => {
  console.log(`Connected to ${config.db.host}/${config.db.name}`);
  gfs = gridFs(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

conn.once("error", error => {
  console.error("Could not connect to database!");
  console.error(error);
});

// Create storage engine
const storage = new gridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // TODO: Check mime type of file
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

module.exports = { upload };
