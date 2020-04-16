// Initializes the `mapbox` service on path `/mapbox`
const { Mapbox } = require('./mapbox.class');
const hooks = require('./mapbox.hooks');

module.exports = function(app) {
    const options = {
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/mapbox', new Mapbox(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('mapbox');

    service.hooks(hooks);
};
