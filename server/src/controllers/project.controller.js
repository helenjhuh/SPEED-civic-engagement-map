const { Project, Address, User } = require("../models");
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

exports.addWithAddress = (req, res) => {
  const {
    name,
    description,
    type,
    website,
    street1,
    street2,
    city,
    region,
    zip,
    lat,
    lng,
    country,
    owner
  } = req.body;
  // create the address first
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
      if (error) return SendError(res, 500, error);

      // now that we have the address, we can create the project, and establish a
      // relationship between the address and the project
      Project.create(
        {
          name,
          description,
          type,
          website,
          address: address._id,
          owner
        },
        (error, project) => {
          if (error) return SendError(res, 500, error);
          // once we have the project, we need to add the project id to
          // the user's project stack
          User.findOne({ _id: owner }, (error, user) => {
            if (error) return SendError(res, 500, error);
            user.projects.push(project._id);
            user.save(error => {
              if (error) return SendError(res, 500, error);
              return SendSuccess(res, 200, { project });
            });
          });
        }
      );
    }
  );
};

exports.byUser = (req, res) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id) || !id)
    return SendFailure(res, 400, en_US.BAD_REQUEST);

  Project.find({ owner: id })
    .populate("address")
    .populate({
      path: "pins",
      populate: { path: "address" }
    })
    .exec((error, projects) => {
      if (error) return SendError(res, 500, error);
      return SendSuccess(res, 200, { projects });
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
