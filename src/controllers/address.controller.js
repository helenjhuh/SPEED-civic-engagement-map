const { Address } = require("../models");
const { Types } = require("mongoose");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");
const en_US = require("../localization/en_US");
const { addressValidator } = require("../middleware/validators");
const Joi = require("@hapi/joi");

exports.browse = (req, res) => {
  Address.find({}, (error, addresses) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { addresses });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Address.findById(id, (error, address) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { address });
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  const {
    belongsTo,
    street1,
    street2,
    city,
    region,
    zip,
    country,
    lat,
    lng
  } = req.body;

  // Construct the update object that will get passed into
  // The model update func
  const update = {};
  belongsTo && Object.assign({ belongsTo }, update);
  street1 && Object.assign({ street1 }, update);
  street2 && Object.assign({ street2 }, update);
  city && Object.assign({ city }, update);
  region && Object.assign({ region }, update);
  zip && Object.assign({ zip }, update);
  country && Object.assign({ country }, update);
  lat && Object.assign({ lat }, update);
  lng && Object.assign({ lng }, update);

  Address.updateOne({ id }, update, (error, address) => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { address });
  });
};

exports.add = (req, res) => {
  Joi.validate(req.body, addressValidator, (error, isValid) => {
    if (error) return SendFailure(res, 400, error.toString());

    const {
      belongsTo,
      street1,
      street2,
      city,
      region,
      zip,
      country,
      lat,
      lng
    } = req.body;

    Address.create(
      { belongsTo, street1, street2, city, region, zip, country, lat, lng },
      (error, address) => {
        if (error) return SendError(res, 500, error);
        return SendSuccesss(res, 200, { address });
      }
    );
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Address.findOneAndRemove(id, error => {
    if (error) return SendError(res, 500, error);
    return SendSuccess(res, 200, { message: en_US.DELETE_SUCCESS });
  });
};
