const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * I added an email and password field for this, both of which are required
 * for the passport-signup strategy to work correctly. I'm not sure if contact_email
 * is the same as the email of the registering user. If it is, the passport-strategy can 
 * be pretty easily reworked to use the contact_email field instead of email
 * 
 *  7/1 - TW
 */

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
  zip: String,
  email: String,
  password: String 
});

// This hashes a new user's password
userSchema.pre("save", function(next) {
  let user = this;

  // The password only needs to be hashed if it is new
  if (!user.isModified("password")) return next();

  const salt_work_factor = 11;
  bcrypt.genSalt(salt_work_factor, (error, salt) => {
    if (error) return next(error);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    })
  })  
  
});

// This compares the user's given password with the hash
userSchema.methods.validPassword = password => (bcrypt.compareSync(password, this.password));

module.exports = mongoose.model("User", userSchema);
