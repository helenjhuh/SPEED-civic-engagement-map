const express = require("express");
const router = express.Router();
const { roleController } = require("../../controllers");

/**
 * @description Browse roles
 */
router.get("/", roleController.browse);

/**
 * @description Get a single role by id
 */
router.get("/:id", roleController.read);

/**
 * @description Edit a role
 */
router.put("/:id/edit", roleController.edit);

/**
 * @description Add a role
 */
router.post("/add", roleController.add);

/**
 * @description Delete a role
 */
router.delete("/:id/delete", roleController.delete);

module.exports = router;
