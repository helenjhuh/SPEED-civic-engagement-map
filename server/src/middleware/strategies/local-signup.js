const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user.model");

const LocalSignupStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, done) => {
    // First, attempt to find the user.
    User.findOne({ email }, (error, user) => {
      if (error) return done(error);
      if (user) return done(null, false); // user already exists with that email!

      // destructure the fields from req.body to keep everything nice and neat
      const { first, last, college = "no college provided" } = req.body;
      // validate the fields
      if (!email) return done("Email field is required!");
      if (!password) return done("Password field is required!");

      // If everything checks out, the user can be created
      User.create(
        {
          email,
          first,
          last,
          college,
          password
        },
        (error, user) => {
          if (error) return done(error);
          return done(null, user);
        }
      );
    });
  }
);

module.exports = LocalSignupStrategy;
