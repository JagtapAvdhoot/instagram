const { Router } = require("express");
const {
  createPost,
  likePost,
  pinPost,
  removePost,
  reportPost,
  savePost,
  updatePost,
  uploadMedia,
  removeMedia,
  getFeed,
  getExplore,
  sharePost,
  seedPosts,
  getFilters,
} = require("../controllers/post.controller");
const requireSignIn = require("../middlewares/signIn");

const postRouter = Router();

postRouter.get("/feed", requireSignIn, getFeed);
postRouter.get("/explore", requireSignIn, getExplore);
postRouter.get("/seed", requireSignIn, seedPosts);
postRouter.get("/filter", requireSignIn, getFilters);
postRouter.get("/pin", requireSignIn, pinPost);
postRouter.get("/save", requireSignIn, savePost);
postRouter.get("/like", requireSignIn, likePost);


postRouter.delete("/remove", requireSignIn, removePost);

postRouter.put("/update", requireSignIn, updatePost);
postRouter.put("/report", requireSignIn, reportPost);

postRouter.post("/remove-file", requireSignIn, removeMedia);
postRouter.post("/upload-file", requireSignIn, uploadMedia);
postRouter.post("/create", requireSignIn, createPost);

module.exports = postRouter;
