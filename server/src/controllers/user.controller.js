const { Types } = require("mongoose");
const moment = require("moment");

const createError = require("../middlewares/createError");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const asyncHandler = require("../middlewares/asyncHandler");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/apiResponse");

const doesUserExists = asyncHandler(async (query, res) => {
  const requestedUser = await User.exists(query);
  if (!requestedUser) return sendErrorResponse({ res, statusCode: 404 });
  return true;
});

const getProfile = asyncHandler(async (req, res) => {
  const { user } = req.query;
  const searchParameter = user.toString();
  if (!user) return sendErrorResponse({ res, statusCode: 400 });

  const requestedUser = await User.findOne(
    {
      username: searchParameter,
    },
    "bio username followingUsers followerUsers website avatar _id fullName tags"
  );

  const posts = await Post.find({ user: requestedUser._id }).select(
    "media _id"
  );

  sendSuccessResponse({ res, data: { user: requestedUser, posts } });
});

const getSignedUser = asyncHandler(async (req, res) => {
  // const socket = req.app.get("socketIo");
  const signedUser = req.user;
  const { select = '_id' } = req.query;

  const requestedUser = await User.findOne(
    {
      _id: signedUser._id,
    },
  ).select('-password -__v -token -userReports');
  sendSuccessResponse({ res, data: { user: requestedUser } });
});

const getSearch = asyncHandler(async (req, res) => {
  const { search } = req.query;
  let users, posts;
  const searchParameter = { $regex: search.toString(), $options: "i" };

  users = await User.find({
    $or: [{ username: searchParameter }, { email: searchParameter }],
  }).select("username fullName _id avatar");

  // res.status(200).json({ user: requestedUser, posts: userPosts });
  sendSuccessResponse({ res, data: { users, posts } });
});

const getUserLikedPost = asyncHandler(async (req, res) => { });

const getUserSavedPost = asyncHandler(async (req, res) => { });

const reportUser = asyncHandler(async (req, res) => {
  const { uid: targetId } = req.query;
  const { _id } = req.user;
  const { message } = req.body;

  if (!targetId) return sendErrorResponse({ res, statusCode: 404 });

  const requestedUser = await doesUserExists({ _id: targetId }, res);

  User.findByIdAndUpdate(targetId, {
    $addToSet: { userReports: { user: _id, message } },
  });

  sendSuccessResponse({ res, message: "User reported" });
});

const followUser = asyncHandler(async (req, res) => {
  const { uid } = req.query;
  const { _id } = req.user;

  if (!uid) return sendErrorResponse({ res, statusCode: 400 });

  const obUid = new Types.ObjectId(uid);

  const requestedUser = await User.exists({ _id: obUid });

  if (!requestedUser) return sendErrorResponse({ res, statusCode: 404 });

  const userFollowingUpdate = await User.updateOne(
    { _id: _id, "followingUsers.user": { $ne: obUid } },
    {
      $addToSet: {
        followingUsers: {
          user: obUid,
          time: moment().format("L"),
        },
      },
    }
  );
  const userFollowerUpdate = await User.updateOne(
    { _id: obUid, "followerUsers.user": { $ne: _id } },
    {
      $addToSet: {
        followerUsers: {
          user: _id,
          time: moment().format("L"),
        },
      },
    }
  );
  // un follow
  if (
    userFollowingUpdate.modifiedCount === 0 ||
    userFollowerUpdate.modifiedCount === 0
  ) {
    await User.updateOne(
      { _id: _id },
      {
        $pull: {
          followingUsers: {
            user: obUid,
          },
        },
      }
    );
    await User.updateOne(
      { _id: obUid },
      {
        $pull: {
          followerUsers: {
            user: _id,
          },
        },
      }
    );
  }

  // res.status(200).json({ message: "follow user route" });
  sendSuccessResponse({ res, message: "user followed/unfollowed" });
});

const favoriteUser = asyncHandler(async (req, res) => {
  const { uid: targetId } = req.query;
  const { _id: userId } = req.user;
  const socket = req.app.get("socketIo");

  await doesUserExists({ _id: targetId }, res);

  const favoriteUpdate = await User.updateOne(
    { _id: userId, "favorites.user": { $ne: targetId } },
    {
      $addToSet: {
        favorites: {
          user: targetId,
        },
      },
    }
  );

  if (favoriteUpdate.modifiedCount === 0) {
    await User.updateOne(
      { _id: userId },
      {
        $pull: {
          favorites: {
            user: targetId,
          },
        },
      }
    );
  }

  // res.status(200).json({ message: "favorite user route" });
  sendSuccessResponse({ res, message: "user added/removed from favorites" });

  await socket.in(userId.toString()).emit("user favorite", targetId);
});

const getFollowers = asyncHandler(async (req, res) => {
  const { uid } = req.query;
  if (!uid) return sendErrorResponse({ res, statusCode: 404 });
  const followers = await User.findById(uid).select('followerUsers')

  sendSuccessResponse({ res, data: { followers } })
});

const getFollowings = asyncHandler(async (req, res) => {
  const { uid } = req.query;
  if (!uid) return sendErrorResponse({ res, statusCode: 404 });
  const followings = await User.findById(uid).select('followingUsers')

  sendSuccessResponse({ res, data: { followings } })
});

const getSuggestedUsers = asyncHandler(async (req, res) => {
  const signedUser = req.user;
  let suggestedUsers;
  const user = await User.findOne(
    { _id: signedUser },
    "followingUsers followerUsers"
  );

  const userIds = user.followingUsers.map((item) => item.user);

  suggestedUsers = await User.find({
    _id: { $nin: [signedUser._id, ...userIds] },
  })
    .select("_id username avatar")
    .exec();

  if (suggestedUsers.length === 0) {
    suggestedUsers = await User.find().select("_id username avatar")
  }
  console.log('user.controller.js:209', suggestedUsers);
  sendSuccessResponse({ res, data: { users: suggestedUsers } });
});

const resetPassword = asyncHandler(async (req, res) => { });

const changeAvatar = asyncHandler(async (req, res) => { });

module.exports = {
  getProfile,
  getSuggestedUsers,
  getSearch,
  getUserLikedPost,
  getUserSavedPost,
  favoriteUser,
  reportUser,
  followUser,
  getFollowers,
  getFollowings,
  resetPassword,
  changeAvatar,
  getSignedUser,
};
