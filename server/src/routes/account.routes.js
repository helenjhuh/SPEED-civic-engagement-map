const express = require("express");
const router = express.Router();
const { accountController } = require("../controllers");

/* Here we're going to show the specific information for a user
* we can pass in our req.user as an object because it contains all of
* the information of an account owner already
*/

/**
 * @description Returns the user information
 */
router.get("/:id", accountController.read);

/**
 * @description Renders the edit user page
 */
router.get("/:id/edit", accountController.edit);

module.exports = router;