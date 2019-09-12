const { isLoggedIn } = require("../middleware/isLoggedIn");
const geoUser = require("../models/GeoJson");

exports.read = isLoggedIn, (req, res) => {
  res.render("pages/account", { currUser: req.user});
}

exports.edit = isLoggedIn, (req, res) => {
  geoUser.find({
      '_id': {
        $in: 
          req.user.usersPins
      }
  }, (err, docs) => {
      err ? res.redirect('pages/error') : res.render('pages/manage_pins', {pins: docs});
  });
}
