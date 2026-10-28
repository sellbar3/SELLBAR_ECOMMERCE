function success(
  res,
  data,
  message = "Success",
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function failure(
  res,
  message = "Request failed",
  statusCode = 400,
  errors = null
) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {})
  });
}

module.exports = {
  success,
  failure
};