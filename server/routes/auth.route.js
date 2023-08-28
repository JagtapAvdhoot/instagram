const { Router } = require("express");
const {
  signInUser,
  signUpUser,
  refreshToken,
} = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.post("/sign-in", refreshToken);
// authRouter.post("/sign-in", signInUser);
// authRouter.post("/sign-in", signInUser);

module.exports = authRouter;
