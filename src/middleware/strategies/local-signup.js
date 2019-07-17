const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

const LocalSignupStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, (req, email, password, done) => {
    // First, attempt to find the user.
    User.findOne({ email }, (error, user) => {
      if (error) return done(null, false)
      if (user) return done(null, false) // user already exists with that email!

      // destructure the fields from req.body to keep everything nice and neat
      console.log(req.body);
      const { email, password, first_name, last_name, college, occupation } = req.body;

      // validate the fields
      if (!email) return done("Email field is required!");
      if (!password) return done("Password field is required!");

      // If everything checks out, the user can be created
      User.create({
        email, password, first_name, last_name, college, occupation
      }, (error, user) => {
        if (error) return done(error);
        return done (null, user);
      })

    })
  }
);

module.exports = LocalSignupStrategy;
