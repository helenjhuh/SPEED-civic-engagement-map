const { Pin } = require("../models");
const { SendSuccess, SendFailure, SendError } = require("../helpers/responses");

exports.browse = (req, res) => {
  Pin.find({}, (error, pins) => {
    if (error) return SendError(res, error);
    return SendSuccess(res, 200, { data: pins });
  });
};

exports.read = (req, res) => {
  const { id } = req.params;
  if (!req.params.id) return SendFailure(res, 400, "id not provided");
  Pin.findById(id, (error, pin) => {
    if (error) return SendError(res, error);
    return SendSuccess(res, 200, { data: pin });
  });
};

exports.edit = (req, res) => {};

exports.add = (req, res) => {};

exports.delete = (req, res) => {};
