/**
 * @description Multiple roles can belong to a user, and give the user access (along with passport, which checks a user's roles) to give the user access (or prohibit access) to certain resources
 */

const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Role", roleSchema);