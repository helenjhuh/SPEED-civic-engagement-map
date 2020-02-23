/* eslint-disable no-unused-vars */
const MapboxSDK = require("@mapbox/mapbox-sdk");
const GeocodingService = require("@mapbox/mapbox-sdk/services/geocoding");

exports.Mapbox = class Mapbox {
  constructor(options) {
    this.options = options || [];
  }

  async setup(app) {
    this.app = app;
    const APIKey = this.app.get("mapboxAPIKey");
    const MapboxBaseClient = MapboxSDK({ accessToken: APIKey });
    this.geocodeClient = GeocodingService(MapboxBaseClient);
  }

  async find(params) {
    const { query } = params;

    const response = await this.geocodeClient({ query, limit: 5 });
    const results = response.json();

    return results;
  }
};
