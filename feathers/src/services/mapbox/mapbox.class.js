/* eslint-disable no-unused-vars */
const GeocodeService = require('@mapbox/mapbox-sdk/services/geocoding');
const MapBoxSDK = require('@mapbox/mapbox-sdk');

exports.Mapbox = class Mapbox {
    setup(app) {
        this.app = app;
    }

    async find(params) {
        const { query, limit = 1 } = params.query;
        const APIKey = this.app.get('mapboxAPIKey');
        const MapboxBaseClient = MapBoxSDK({ accessToken: APIKey });
        const GeocodeClient = GeocodeService(MapboxBaseClient);

        if (!query) return [];

        const opts = { query, limit: +limit };

        const request = await GeocodeClient.forwardGeocode(opts);
        const response = await request.send();
        const results = await response;
        const { statusCode, body } = results;
        const { features } = body;
        if (statusCode !== 200) {
            return [];
        }
        return features || [];
    }
};
