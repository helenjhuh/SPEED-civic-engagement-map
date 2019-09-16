const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    belongsTo: {
      type: String,
    },
    street1: {
      type: String
    },
    street2: {
      type: String
    },
    city: {
      type: String
    },
    region: {
      type: String
    },
    zip: {
      type: String
    },
    country: {
      type: String
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
});

module.exports = mongoose.model("Address", addressSchema);