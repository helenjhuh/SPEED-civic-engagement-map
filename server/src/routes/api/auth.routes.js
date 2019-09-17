const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/test", (req, res) => {
  res.send({
    message: "hello"
  });
});

router.post("/signup", passport.authenticate("local-signup"), (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      user: req.user
    }
  });
});

router.post("/login", passport.authenticate("local-login"), (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      user: req.user
    }
  });
});

module.exports = router;
