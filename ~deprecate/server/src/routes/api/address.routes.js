const express = require("express");
const router = express.Router();
const { addressController } = require("../../controllers");

/**
 * @description Browse addresses
 */
router.get("/", addressController.browse);

/**
 * @description Get a single address by id
 */
router.get("/:id", addressController.read);

/**
 * @description Edit an address
 */
router.put("/:id/edit", addressController.edit);

/**
 * @description Add an address
 */
router.post("/add", addressController.add);

/**
 * @description Delete an address
 */
router.delete("/:id/delete", addressController.delete);

module.exports = router;
