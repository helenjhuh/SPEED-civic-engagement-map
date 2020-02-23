// Initializes the `photos` service on path `/photos`
const { Photos } = require("./photos.class");
const createModel = require("../../models/photos.model");
const hooks = require("./photos.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/photos", new Photos(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("photos");

  service.hooks(hooks);
};
