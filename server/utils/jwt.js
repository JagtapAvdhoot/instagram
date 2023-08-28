const jwt = require("jsonwebtoken");

const signJWT = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

const verifyJWT = (token) => jwt.sign(token, process.env.JWT_SECRET);
const decodeJWT = (token) => jwt.decode(token);

module.exports = {
  signJWT,
  verifyJWT,decodeJWT
};
