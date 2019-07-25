const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/user");

const LocalLoginStrategy = new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (email, password, done) => {
  User.findOne({ email }, (error, user) => {

    if (error) return done(error);
    
    // could not find the user!
    if (!user) return done(null, false);

    // user supplied incorrect password
    
    if (!user.validPassword(password, user.password)) return done(null, false);

    // everything is good
    return done(null, user);
  })
});

module.exports = LocalLoginStrategy;
