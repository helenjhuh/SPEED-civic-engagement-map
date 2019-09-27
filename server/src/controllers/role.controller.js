const { Role } = require("../models");
const { Types } = require("mongoose");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const en_US = require("../localization/en_US");
const { roleValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  Role.find({}, (error, roles) => {
    if (error) return SendError(Res, 500, error);
    return SendSuccess(res, 200, { roles });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);
  Role.findById(id, (error, role) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { role });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);
  const { name, description } = req.body;

  // Construct the update object that will get passed into
  // The model update func
  const update = {};
  name && Object.assign({ name }, update);
  description && Object.assign({ description }, update);

  Role.updateOne({ id }, update, (error, role) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { role });
  });
};

exports.add = (req, res) => {
  const { name, description } = req.body;

  Role.create({ name, description }, (error, role) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { role });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Role.findOneAndRemove(id, error => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { message: en_US.DELETE_SUCCESS });
  });
};
