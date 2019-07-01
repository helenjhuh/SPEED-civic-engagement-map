const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("pages/auth/login");
});

router.get("/signup", (req, res) => {
  res.render("pages/auth/signup");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/signup", passport.authenticate("local-signup", {
  successRedirect: "/",
  failureRedirect: "/signup"
}));

router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

module.exports = router;