const express = require("express");
const router = express.Router();
const { mapController } = require("../controllers");

const isLoggedIn = (req, res, next) => true;
const checkOwner = (req, res, next) => true;

/**
 * @description Get all of the geoJSON representations of user information
 * and render our pages/index which should have all of our markers
 * for each one of those users.
 */
router.get("/", mapController.browse);

/**
 * @description Show info about a pin route
 */
router.get("/:id", mapController.read);

/**
 * @description If a user is logged in then redirect them to our post page and have them fill out that form.
 * but, if the user isn't logged in then they can't add a pin.
 *
 * We need to convert the form that the user inputted into geoJson and send it off to Mapbox Geocoding service.
 * We also need to save that geoJson object to our database so it can render on our map and we need to link that geoJson
 * to the user that posted it to the map.
 */
router.post("/", isLoggedIn, (req, res) => {
  /*Try A search*/
  geocodingService
    .forwardGeocode({
      query: "Searchable"
    })
    .send()
    .then(response => {
      /* BUILD OUR ADDRESS */
      let this_address = req.body.address.concat(
        " ",
        req.body.city,
        ",",
        " ",
        req.body.state,
        " ",
        req.body.zip,
        " ",
        req.body.country
      );

      /* GET THE USERS ADDRESS AND QUERY GEOCDOING SERVICES FOR LNG,LAT */
      geocodingService
        .forwardGeocode({
          query: this_address,
          limit: 2
        })
        .send()
        .then(response => {
          /* Grab the coordinates based on our query from here and begin to constuct geoJSON object */
          let temp = {
            title: req.body.title,
            project_type: req.body.project,
            description: req.body.description,
            project_website: req.body.project_website,
            img: req.body.img,
            building: req.body.building,
            room_number: req.body.room_number,
            community_partners: req.body.community_partners,
            project_mission: req.body.project_mission,
            lat: response.body.features[0].center[1],
            lng: response.body.features[0].center[0]
          };

          temp = GeoJSON.parse(temp, { Point: ["lat", "lng"] });
          geoUser.create(temp, (err, newPin) => {
            /* Here we're linking that geoJson post with the account it was made from */
            newPin.properties.owner.id = req.user._id;
            newPin.properties.owner.username = req.user.email;
            newPin.properties.self._id = newPin._id;

            /* Make sure this pin is added to the owners collection of pins */
            User.findById(req.user._id)
              .populate("usersPins")
              .exec((error, ele) => {
                if (error) {
                  res.render("pages/error");
                } else {
                  ele.usersPins.push(newPin._id);
                  ele.save();
                }
              });

            newPin.save();

            err ? res.render("pages/error") : res.redirect("/cem_map");
          });
        })
        .catch(err => console.log(err));
    });
});

/* CREATE ROUTE */
router.get("/new", isLoggedIn, (req, res) => {
  res.render("pages/new");
});

//EDIT ROUTE
// TODO: Make sure the user is the owner of the pin
router.get("/:id/edit", checkOwner, (req, res) => {
  geoUser.findById(req.params.id).exec((err, found) => {
    res.render("pages/edit", { thisPin: found });
  });
  /*If not we're gonna redirect*/
});

//UPDATE A PIN ROUTE
// TODO: Make sure the user is the owner of the pin

router.put("/:id", checkOwner, (req, res) => {
  let newPin = {
    "properties.title": req.body.title,
    "properties.project_type": req.body.project_type,
    "properties.description": req.body.description,
    "properties.project_website": req.body.project_website,
    "properties.img": req.body.img,
    "properties.building": req.body.building,
    "properties.room_number": req.body.room_number,
    "properties.community_partners": req.body.community_partners,
    "properties.project_mission": req.body.project_mission
  };
  geoUser.findByIdAndUpdate(
    req.params.id,
    { $set: newPin },
    { new: true },
    (err, updatedPin) => {
      err
        ? res.redirect("pages/error")
        : res.redirect("/cem_map/" + req.params.id);
    }
  );
});

//SHOW ACCOUNT PAGE
// TODO: Make sure the user is the owner, or has authorization to perform the act
router.get("/account/:id", checkOwner, (req, res) => {
  res.send("Show accounts page!");
});

//DESTROY A PIN
// TODO: Make sure the user is the owner, or has authorization to perform the act
router.delete("/:id", checkOwner, (req, res) => {
  /* Get the owner of this pin */
  geoUser.findById(req.params.id).exec((err, found) => {
    if (err) res.render("pages/error");

    /*Access the owner field and grab the users id*/
    User.findById(found.properties.owner.id, (err, thisUser) => {
      if (err) {
        res.redirect("pages/error");
      } else {
        /* After finding user we can update their fields */
        User.updateOne(
          { _id: thisUser._id },
          { $pull: { usersPins: { $in: [req.params.id] } } }
        )

          /* Delete was successful if we reach then so we can remove it from our geoUser*/
          .then(() => successfulDeleteBlock())
          .catch(err => res.redirect("pages/error"));

        function successfulDeleteBlock() {
          geoUser.findByIdAndRemove(req.params.id, err => {
            err ? res.redirect("pages/error") : res.redirect("/");
          });
        }
      }
    });
  });
});

module.exports = router;
