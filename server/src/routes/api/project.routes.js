const express = require("express");
const router = express.Router();
const { projectController } = require("../../controllers");
const { storage } = require("../../app");
const { Project } = require("../../models");
const { Types } = require("mongoose");
const {
  SendSuccess,
  SendFailure,
  SendError
} = require("../../helpers/responses");
const multer = require("multer");
const upload = multer({ storage });

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
 * @description Add a project with an address
 */
router.post("/add-with-address", projectController.addWithAddress);

/**
 * @description Get projects owned by a user
 * @param :id The user id
 */
router.get("/by-user/:id", projectController.byUser);

/**
 * @description Delete a project
 */
router.delete("/:id/delete", projectController.delete);

/**
 * @description Adds a photo to a project
 * @param :id The project id to upload the photo to
 */
router.post("/:id/upload", upload.array("photos", 12), (req, res) => {
  const { id } = req.params;

  // If the project has an invalid id, don't bother to proceed
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  // Retrieve the project, and save the photo's id to it
  Project.update({ _id: id }, { $push: { photos: req.file.id } }, err => {
    if (err) {
      SendError(res, 400, error);
    }
    SendSuccess(res, 200, { message: "Upload success" });
  });
});

module.exports = router;
