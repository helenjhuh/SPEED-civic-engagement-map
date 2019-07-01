const passport = require("passport");

const LocalLoginStrategy = require("./strategies/local-login");
const LocalSignupStrategy = require("./strategies/local-signup");

module.exports = passport => {
  passport.use("local-login", LocalLoginStrategy),
  passport.use("local-signup", LocalSignupStrategy)
};
