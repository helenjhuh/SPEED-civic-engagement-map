const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/signup", passport.use("local-signup"), (req, res) => {});
router.post("/login", passport.use("local-login"), (req, res) => {});

module.exports = router;