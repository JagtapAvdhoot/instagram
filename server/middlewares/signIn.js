const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const createError = require("./createError");
const { sendErrorResponse } = require("../utils/apiResponse");

const requireSignIn = async (req, res, next) => {
  const authorization = req.headers["authorization"];

  if (!authorization) return next(createError(401,"NoToken"));

  try {
    const payload = jwt.verify(authorization, process.env.JWT_SECRET);

    const user = await User.findById(payload._id, "_id");

    if (!user) return sendErrorResponse({ statusCode: 404, res });

    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = requireSignIn;
