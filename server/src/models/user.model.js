const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  college: String,
  email: String,
  password: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address"
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
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
    });
  });
});

// This compares the user's given password with the hash. It will return true or false, depending
// on if the provided password was correct
userSchema.methods.validPassword = (password, encryptedPassword) =>
  bcrypt.compareSync(password, encryptedPassword);

module.exports = mongoose.model("User", userSchema);
