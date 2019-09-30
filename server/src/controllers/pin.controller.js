const { Pin, Address, Project } = require("../models");
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

exports.addWithAddressToProject = (req, res) => {
  // a project id must be provided to add a pin to it
  const { id } = req.query;
  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  // grab the address content from the request
  const { street1, street2, city, region, zip, country, lat, lng } = req.body;
  Address.create(
    {
      street1,
      street2,
      city,
      region,
      zip,
      country,
      lat,
      lng
    },
    (error, address) => {
      if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);

      Pin.create({ address: address._id }, (error, pin) => {
        if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);
        // associate the pin with the project
        Project.findById(id, (error, project) => {
          if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);
          if (!project) return SendFailure(res, 400, en_US.BAD_REQUEST);
          project.pins.push(pin._id);
          project.save(error => {
            if (error) return SendFailure(res, 400, en_US.BAD_REQUEST);

            // If everything goes smoothly, send back the created pin
            return SendSuccess(res, 200, { pin });
          });
        });
      });
    }
  );
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

exports.addToProject = (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Address.create({});
};
