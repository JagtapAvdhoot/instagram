const sendSuccessResponse = ({ res, data={}, statusCode = 200 }) => {
  res.status(statusCode).json({ success: true, data });
};

const sendErrorResponse = ({
  res,
  message = "Internal server error",
  statusCode = 500,
}) => {
  res.status(statusCode).json({ success: false, error: message });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
