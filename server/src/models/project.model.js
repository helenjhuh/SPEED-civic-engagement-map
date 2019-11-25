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
      type: mongoose.Schema.Types.String,
      required: true
    }
  ],
  issue: [
    {
      type: mongoose.Schema.Types.String,
      required: true
    }
  ],
  langGrants: [
    {
      type: mongoose.Schema.Types.String
    }
  ],
  communityPartners: [
    {
      type: mongoose.Schema.Types.String,
      required: true
    }
  ],
  funders: [
    {
      type: mongoose.Schema.Types.String
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
