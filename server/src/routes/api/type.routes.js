const express = require("express");
const router = express.Router();
const { typeController } = require("../../controllers");

/**
 * @description Browse types
 */
router.get("/", typeController.browse);

/**
 * @description Get a single type by id
 */
router.get("/:id", typeController.read);

/**
 * @description Edit a type
 */
router.put("/:id/edit", typeController.edit);

/**
 * @description Add a type
 */
router.post("/add", typeController.add);

/**
 * @description Delete a type
 */
router.delete("/:id/delete", typeController.delete);

module.exports = router;
