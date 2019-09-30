const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: true // set the default to true as long as project verification does not exist
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  website: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  pins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin"
    }
  ]
});

module.exports = mongoose.model("Project", projectSchema);
