const express = require("express");
const router = express.Router();
const { pinController } = require("../../controllers");

/**
 * @description Browse pins
 */
router.get("/", pinController.browse);

/**
 * @description Get a single pin by id
 */
router.get("/:id", pinController.read);

/**
 * @description Edit a pin
 */
router.put("/:id/edit", pinController.edit);

/**
 * @description Add a pin with a given address ObjectId
 */
router.post("/add", pinController.add);

/**
 * @description Add a pin with a given address
 */
router.post(
  "/add-with-address-to-project",
  pinController.addWithAddressToProject
);

/**
 * @description Delete a pin
 */
router.delete("/:id/delete", pinController.delete);

module.exports = router;
