const { Project } = require("../models");
const { Types } = require("mongoose");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const en_US = require("../localization/en_US");
const { projectValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  Project.find({}, (error, projects) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { projects });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Project.findById(id, (error, project) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { project });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  const { name, description, type, website, owner, address, pins } = req.body;

  // Construct the update object that will get passed into
  // The model update func
  const update = {};
  name && Object.assign({ name }, update);
  description && Object.assign({ description }, update);
  type && Object.assign({ type }, update);
  website && Object.assign({ website }, update);
  owner && Object.assign({ owner }, update);
  address && Object.assign({ address }, update);
  pins && Object.assign({ pins }, update);

  Project.updateOne({ id }, update, (error, project) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { project });
  });
};

exports.add = (req, res) => {
  Joi.validate(req.body, projectValidator, (error, isValid) => {
    if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);

    const { name, description, type, website, owner, address, pins } = req.body;

    Project.create(
      { name, description, type, website, owner, address, pins },
      (error, project) => {
        if (error) return SendError(res, 500, error);
        return SendSuccess(res, 200, { project });
      }
    );
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Project.findOneAndRemove(id, error => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { message: en_US.DELETE_SUCCESS });
  });
};
