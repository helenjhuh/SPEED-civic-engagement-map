const users = require("./users/users.service.js");
const addresses = require("./addresses/addresses.service.js");
const projects = require("./projects/projects.service.js");
const pins = require("./pins/pins.service.js");
const photos = require("./photos/photos.service.js");
const roles = require("./roles/roles.service.js");
const mapbox = require("./mapbox/mapbox.service.js");

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(addresses);
  app.configure(projects);
  app.configure(pins);
  app.configure(photos);
  app.configure(roles);
  app.configure(mapbox);
};
