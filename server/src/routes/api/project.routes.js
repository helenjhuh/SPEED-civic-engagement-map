const express = require("express");
const router = express.Router();
const { projectController } = require("../../controllers");

/**
 * @description Browse projects
 */
router.get("/", projectController.browse);

/**
 * @description Get a single project by id
 */
router.get("/:id", projectController.read);

/**
 * @description Edit a project
 */
router.put("/:id/edit", projectController.edit);

/**
 * @description Add a project
 */
router.post("/add", projectController.add);

/**
 * @description Delete a project
 */
router.delete("/:id/delete", projectController.delete);

module.exports = router;
