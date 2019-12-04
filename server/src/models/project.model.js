const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  isVerified: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: [
    {
      type: String,
      required: true
    }
  ],
  issue: [
    {
      type: String,
      required: true
    }
  ],
  langGrants: [
    {
      type: String
    }
  ],
  communityPartners: [
    {
      type: String,
      required: true
    }
  ],
  funders: [
    {
      type: String
    }
  ],
  beneficiaries: {
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
  ],
  photos: [{ type: mongoose.Schema.Types.String }]
});

module.exports = mongoose.model("Project", projectSchema);
