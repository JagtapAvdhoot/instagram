const { Router } = require("express");

const authRouter = require("./auth.route");
const postRouter = require("./post.route");
const userRouter = require("./user.route");

const router = Router();

// create different route based on uploads , gets and posts
router.use("/authentication", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
// router.use("/upload", userRouter);
// router.use("/get", userRouter);
// router.use("/post", userRouter);
// router.use("/put", userRouter);
// router.use("/delete", userRouter);

module.exports = router;
