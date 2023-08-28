const { Router } = require("express");

const {
  addComment,
  updateComment,
  addCommentReply,
  deleteComment,
  deleteCommentReply,
  likeComment,
  likeCommentReply,
} = require("../controllers/comment.controller");
const requireSignIn = require("../middlewares/signIn");

const commentRouter = Router();

commentRouter.post("/add", requireSignIn, addComment);
commentRouter.post("/update", requireSignIn, updateComment);
commentRouter.post("/add/reply", requireSignIn, addCommentReply);

commentRouter.delete("/delete/reply", requireSignIn, deleteCommentReply);
commentRouter.delete("/delete", requireSignIn, deleteComment);

commentRouter.get("/like", requireSignIn, likeComment);
commentRouter.get("/like/reply", requireSignIn, likeCommentReply);

module.exports = commentRouter;
