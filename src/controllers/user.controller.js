const { User } = require("../models");
const { Types } = require("mongoose");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const en_US = require("../localization/en_US");
const { userValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  User.find({}, (error, users) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { users });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);
  User.findById(id, (error, user) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { user });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  const { first, last, email, password } = req.body;

  // Construct the update object that will get passed into
  // The model update func
  const update = {};
  first && Object.assign({ first }, update);
  last && Object.assign({ last }, update);
  email && Object.assign({ email }, update);
  password && Object.assign({ password }, update);

  User.updateOne({ id }, update, (error, user) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { user });
  });
};

exports.add = (req, res) => {
  Joi.validate(req.body, userValidator, (error, isValid) => {
    if (error) return SendFailure(res, 400, error.toString());

    const { first, last, email, password } = req.body;

    User.create({ first, last, email, password }, (error, user) => {
      if (error) return SendError(res, 500, error);
      return SendSuccess(res, 200, { user });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  User.findOneAndRemove(id, error => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { message: en_US.DELETE_SUCCESS });
  });
};

exports.addProject = (req, res) => {};
exports.addAddress = (req, res) => {};
exports.addRole = (req, res) => {};

exports.deleteProject = (req, res) => {};
exports.deleteAddress = (req, res) => {};
exports.deleteRole = (req, res) => {};
