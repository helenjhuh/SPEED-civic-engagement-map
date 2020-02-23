// Initializes the `pins` service on path `/pins`
const { Pins } = require("./pins.class");
const createModel = require("../../models/pins.model");
const hooks = require("./pins.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/pins", new Pins(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("pins");

  service.hooks(hooks);
};
