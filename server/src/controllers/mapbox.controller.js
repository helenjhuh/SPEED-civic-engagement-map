const config = require("../config");
const en_US = require("../localization/en_US");
const GeocodeService = require("@mapbox/mapbox-sdk/services/geocoding");
const MapBoxSDK = require("@mapbox/mapbox-sdk");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");

const MBBaseClient = MapBoxSDK({ accessToken: config.mapbox.apiToken });
const GeocodeClient = GeocodeService(MBBaseClient);

exports.geocode = (req, res) => {
  const { place } = req.params;

  if (!place) return SendFailure(res, 400, en_US.BAD_REQUEST);

  GeocodeClient.forwardGeocode({
    query: place,
    limit: 1
  })
    .send()
    .then(results => {
      SendSuccess(res, 200, { results: results.body });
    });
};
