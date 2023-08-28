const { sendErrorResponse } = require("../utils/apiResponse");

const errorHandler = (error, _req, res, _next) => {
  console.error(error);
  if (error.name === "TokenExpiredError") {
    return sendErrorResponse({
      res,
      statusCode: 401,
      message: "Token expired",
    });
  } else if (error.message === "NoToken") {
    return sendErrorResponse({
      res,
      statusCode: 401,
      message: "Invalid token",
    });
  }
  sendErrorResponse({ res, statusCode: 500, message: "internal server error" });
};

module.exports = errorHandler;
