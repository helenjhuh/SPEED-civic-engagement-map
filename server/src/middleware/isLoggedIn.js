/**
 * Redirect the user if to the login page if passport does not have
 * an authentication for the user.
 */
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
};
