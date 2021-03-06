const express = require("express");
const router = express.Router();
const { userController } = require("../../controllers");

/**
 * @description Browse users
 */
router.get("/", userController.browse);

/**
 * @description Get a single user by id
 */
router.get("/:id", userController.read);

/**
 * @description Edit a user
 */
router.put("/:id/edit", userController.edit);

/**
 * @description Add a user
 */
router.post("/add", userController.add);

/**
 * @description Delete a user
 */
router.delete("/:id/delete", userController.delete);

/**
 * @description Add a role to user
 * @param user {string} User id
 * @param role {string} Role id
 */
router.post("/:user/add-role/:role", userController.addRole);

module.exports = router;
