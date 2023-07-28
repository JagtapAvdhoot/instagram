function createError(status = 500, message) {
  const error = new Error(message);
  // error.message = message;
  error.status = status;
  return error;
}

module.exports = createError;
