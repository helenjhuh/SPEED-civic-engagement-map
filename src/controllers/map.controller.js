const geoUser = require("../models/GeoJson");

exports.browse = (req, res) => {
  geoUser.find({}, (err, pins) => {
    err ? res.redirect("pages/error") : res.render("pages/index", { users: JSON.stringify(pins) });
  });
}

exports.read = (req, res) => {
  // res.render("pages/show", {thisPin: found});
  geoUser.findById(req.params.id).exec((err, found) => {
    err ? res.render("pages/error") : res.render("pages/show", { thisPin: found });
  });
}