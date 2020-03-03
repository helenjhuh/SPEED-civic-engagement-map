/**
 * @description The pin model represents a pin on the map. Pins are created by users
 */

const mongoose = require("mongoose");

const pinSchema = mongoose.Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  }
})

module.exports = mongoose.model("Pin", pinSchema);