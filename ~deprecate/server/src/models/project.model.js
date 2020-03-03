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
  types: [
    {
      type: String,
      default: undefined
    }
  ],
  issues: [
    {
      type: String,
      default: undefined
    }
  ],
  langGrants: [
    {
      type: String,
      default: undefined
    }
  ],
  communityPartners: [
    {
      type: String,
      default: undefined
    }
  ],
  funders: [
    {
      type: String,
      default: undefined
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
      ref: "Pin",
      default: undefined
    }
  ],
  photos: [
    {
      type: mongoose.Schema.Types.String,
      default: undefined
    }
  ]
});

module.exports = mongoose.model("Project", projectSchema);
