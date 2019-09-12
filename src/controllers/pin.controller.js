const { Pin } = require("../models");

exports.browse = (req, res) => {
  Pin.find({}, (error, pins) => {});
};
exports.read = (req, res) => {};
exports.edit = (req, res) => {};
exports.add = (req, res) => {};
exports.delete = (req, res) => {};
