const { User } = require("../models");
const { Types } = require("mongoose");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const en_US = require("../localization/en_US");
const { userValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  User.find({})
    .populate("roles")
    .exec((error, users) => {
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
    if (error) {
      console.error(error);
      return SendFailure(res, 400, error.toString());
    }

    const { first, last, email, password } = req.body;

    User.create({ first, last, email, password }, (error, user) => {
      if (error) {
        console.error(error.toString());

        return SendError(res, 500, error);
      }
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

exports.addRole = (req, res) => {
  const { user, role } = req.params;

  if (
    !Types.ObjectId.isValid(user) ||
    !user ||
    !Types.ObjectId.isValid(role) ||
    !role
  )
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  // Get the user
  User.findById(user, (error, user) => {
    if (error) return SendError(res, 500, error);

    // no user was found
    if (!user) {
      return SendFailure(res, 400, en_US.BAD_REQUEST);
    }

    // only add the role if it does not already exist in the user's roles
    if (!user.roles.includes(role)) {
      user.roles.push(role);
      user.save(error => {
        if (error) return SendError(res, 500, error);
        return SendSuccess(res, 200, { user });
      });
    } else {
      return SendSuccess(res, 200, { user });
    }
  });
};

exports.deleteProject = (req, res) => {};
exports.deleteAddress = (req, res) => {};
exports.deleteRole = (req, res) => {};
