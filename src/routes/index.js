const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", (req, res) => {
  res.render("pages/landing");
});

router.get("/home/about", (req, res) => {
  res.render("pages/about");
});

router.get("/home/faq", (req, res) => {  
  res.render("pages/faq");
});

module.exports = router;
