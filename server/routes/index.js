const { Router } = require("express");

const authRouter = require("./auth.route");
const postRouter = require("./post.route");
const userRouter = require("./user.route");
const commentRouter = require("./comment.route");

const router = Router();

router.use("/authentication", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);

module.exports = router;
