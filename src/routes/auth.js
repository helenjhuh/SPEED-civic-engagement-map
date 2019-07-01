const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("pages/auth/login");
});

router.get("/signup", (req, res) => {
  res.render("pages/auth/signup");
});

router.post("/signup", passport.authenticate("local-signup"), (req, res) => {});
router.post("/login", passport.authenticate("local-login"), (req, res) => {});

module.exports = router;