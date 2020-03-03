const express = require("express");
const router = express.Router();
const { mapboxController } = require("../../controllers");

/**
 * @description Sends a geocode request to mapbox
 * @returns MapBox geocode response
 */
router.get("/geocode/:place", mapboxController.geocode);

module.exports = router;
