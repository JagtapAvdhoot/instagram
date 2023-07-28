const validator = require("validator").default;
const nodemailer = require("nodemailer");

const User = require("../models/user.model");
const createError = require("../middlewares/createError");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  validateInstagramUsername,
  validateEmail,
} = require("../validator/user.validator");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/apiResponse");
const { compareHash, createHash } = require('../utils/encryptor');
const { signJWT, verifyJWT, decodeJWT } = require("../utils/jwt");

const signUpUser = asyncHandler(async (req, res, next) => {
  const { username, fullName, email, password } = req.body;
  let newUser;
  if (!username || !fullName || !email || !password)
    return sendErrorResponse({ res, statusCode: 400 });
  // validators

  const avatar =
    "https://res.cloudinary.com/dk80tkbsx/image/upload/v1665740243/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper_pfrzer.png";

  const usernameError = validateInstagramUsername(username);

  if (!usernameError) return sendErrorResponse({ res, statusCode: 400 });

  const emailError = validateEmail(email);

  if (!emailError) return sendErrorResponse({ res, statusCode: 400 });

  const hashPassword = createHash(password);

  if (!hashPassword) return sendErrorResponse({ res, statusCode: 400 });

  const userExists = await User.findOne({ $or: [{ username }, { email }] });

  if (userExists) return sendErrorResponse({ res, statusCode: 409 });

  newUser = new User({
    username,
    fullName,
    email,
    password: hashPassword,
    avatar,
  });
  newUser = await newUser.save();

  const token = signJWT({ _id: newUser._id });

  if (!token) return sendErrorResponse({ res });

  // res.status(201).json({ token });
  sendSuccessResponse({ res, data: { token } });
});

const signInUser = asyncHandler(async (req, res, next) => {
  let { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password)
    return sendErrorResponse({ res, statusCode: 400 });
  // validators
  const requestedUser = await User.findOne(
    {
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
    "username _id password email"
  );

  if (!requestedUser) return sendErrorResponse({ res, statusCode: 404 });

  const checkPassword = compareHash(requestedUser.password, password);

  if (!checkPassword) return sendErrorResponse({ res, statusCode: 400 });

  const token = signJWT({ _id: requestedUser._id });

  if (!token) return sendErrorResponse({ res });

  sendSuccessResponse({ res, data: { token } });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.headers["authorization"];

  const payload = decodeJWT(token);

  const newToken = signJWT(payload);

  sendSuccessResponse({ res, data: { token: newToken } });
});
const forgetPassword = async (req, res, next) => { };

const resetPassword = async (req, res, next) => { };

module.exports = { signInUser, signUpUser, forgetPassword, resetPassword, refreshToken };

// POST /forgot-password
async function forgotPassword(req, res) {
  const { email } = req.body;

  try {
    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a random password reset token
    const resetToken = generateResetToken();

    // Save the reset token and its expiration date to the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Configure your email service provider here
    });

    // Compose the email message
    const message = {
      from: "your-email@example.com",
      to: email,
      subject: "Password Reset Request",
      text: `Hi ${user.username},\n\n
        You've requested to reset your password. Click the following link to reset it:\n\n
        ${req.protocol}://${req.get(
        "host"
      )}/reset-password?token=${resetToken}\n\n
        If you didn't request this, please ignore this email.\n\n
        Best regards,\n
        Your App Team`,
    };

    // Send the email
    await transporter.sendMail(message);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Helper function to generate a random password reset token
function generateResetToken() {
  // Implement your token generation logic here
  // For example, you can use a package like `crypto-random-string`
}
