const mongoose = require("mongoose");

/* FIELDS FOR USER SCHEMA
 *
 * Title (String)
 * Description (textarea)
 * Contact: (String)
 * Community Partners: (String)
 * Contact Email: (String)
 *
 */

/* Declare schema */

const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  contact: String,
  community_partners: String,
  contact: String,
  contact_email: String,
  address: String,
  city: String,
  state: String,
  country: String,
  zip: String
});

/*Build our model and export it as a module*/
module.exports = mongoose.model("User", userSchema);
