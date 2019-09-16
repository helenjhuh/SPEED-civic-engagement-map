const { Pin } = require("../models");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const { Types } = require("mongoose");
const en_US = require("../localization/en_US");
const { pinValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  Pin.find({}, (error, pins) => {
    if (error) return SendError(res, error);
    return SendSuccess(res, 200, { pins });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);
  Pin.findById(id, (error, pin) => {
    if (error) return SendError(res, error);
    return SendSuccess(res, 200, { pin });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  const { address } = req.body;

  // Construct the update object that will get passed into
  // The model update func
  const update = {};
  address && Object.assign({ address }, update);

  Pin.updateOne({ id }, update, (error, pin) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { pin });
  });
};

exports.add = (req, res) => {
  Joi.validate(req.body, pinValidator, (error, isValid) => {
    if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);

    const { address } = req.body;
    Pin.create({ address }, (error, pin) => {
      if (error) return SendError(res, 500, error);
      return SendSuccess(res, 200, { pin });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Pin.findOneAndRemove(id, error => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { message: en_US.DELETE_SUCCESS });
  });
};
