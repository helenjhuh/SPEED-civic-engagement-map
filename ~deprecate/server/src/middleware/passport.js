const passport = require("passport");
const User = require("../models/user.model");

const LocalLoginStrategy = require("./strategies/local-login");
const LocalSignupStrategy = require("./strategies/local-signup");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .populate("roles")
    .populate("projects")
    .exec((err, user) => {
      done(err, user);
    });
});

module.exports = passport => {
  passport.use("local-login", LocalLoginStrategy),
    passport.use("local-signup", LocalSignupStrategy);
};
