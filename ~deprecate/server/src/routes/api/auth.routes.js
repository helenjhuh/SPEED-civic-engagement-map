const express = require("express");
const router = express.Router();
const passport = require("passport");
const en_US = require("../../localization/en_US");

const { SendSuccess, SendFailure } = require("../../helpers/responses");

router.get("/success", (req, res) => SendSuccess(res, 200, { user: req.user }));
router.get("/failure", (req, res) =>
  SendFailure(res, 400, { message: en_US.BAD_REQUEST })
);

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    failureRedirect: "/api/auth/failure",
    successRedirect: "/api/auth/success"
  })
);

router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/api/auth/failure",
    successRedirect: "/api/auth/success"
  })
);

module.exports = router;
