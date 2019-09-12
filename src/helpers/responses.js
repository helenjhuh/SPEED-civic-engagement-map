exports.SendSuccess = (res, statusCode = 100, data = {}) => {
  return res.status(statusCode).send({
    status: "success",
    data: data
  });
};

exports.SendFailure = (res, statusCode = 400, message) => {
  return res.status(statusCode).send({
    status: "fail",
    data: {
      message
    }
  });
};

exports.SendError = (res, statusCode = 500, error) => {
  return res.status(statusCode).send({
    status: "error",
    message: error.toString()
  });
};
