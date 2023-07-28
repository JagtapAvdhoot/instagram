const { Router } = require("express");
const {
  followUser,
  getFollowers,
  changeAvatar,
  getFollowings,
  getProfile,
  getSearch,
  getSuggestedUsers,
  getUserLikedPost,
  getUserSavedPost,
  reportUser,
  resetPassword,
  getSignedUser,
  favoriteUser,
} = require("../controllers/user.controller");
const requireSignIn = require("../middlewares/signIn");

const userRouter = Router();

userRouter.get("/search", requireSignIn,getSearch);
userRouter.get("/profile", requireSignIn,getProfile);
userRouter.get("/suggestion", requireSignIn, getSuggestedUsers);
userRouter.get("/signed-user", requireSignIn, getSignedUser);
userRouter.get("/follower", requireSignIn, getFollowers);
userRouter.get("/following", requireSignIn, getFollowings);

userRouter.put("/follow", requireSignIn, followUser);
userRouter.put("/favorite", requireSignIn, favoriteUser);

module.exports = userRouter;
