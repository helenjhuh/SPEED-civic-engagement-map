/**
 * @description Each project must belong to a category/type. If project does not fit into existing types, user can create new type and add to database.
 */

const mongoose = require("mongoose");

const typeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Type", typeSchema);
