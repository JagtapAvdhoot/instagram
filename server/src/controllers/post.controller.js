const moment = require("moment");
const { Types, Schema } = require("mongoose");
const async = require("async");
const _ = require("lodash");
const { Faker, es, faker } = require("@faker-js/faker");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const filters = require("../templates/filter.json");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const asyncHandler = require("../middlewares/asyncHandler");
const { uploadFiles, deleteFiles } = require("../utils/cloudinary");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../utils/apiResponse");
const createError = require("../middlewares/createError");

exports.seedPosts = asyncHandler(async (req, res) => {
  const post = (link) => ({
    description: faker.lorem.paragraphs(4,'\n'),
    hideComments: Boolean(Math.round(Math.random())),
    hideStats: Boolean(Math.round(Math.random())),
    isPinned: false,
    location: faker.location.city(),
    media: [
      {
        index: 0,
        publicId: "instagram_clone/sjg1evg96f6r6gqhhwlm",
        secureUrl: link,
        type: "image",
      },
    ],
    tags: [],
  });

  const signedUser = req.user;
  let linkTwo = "https://picsum.photos/700/1300";
  for (let i = 0; i < 100; i++) {
    try {
      const link = await axios.get(linkTwo);
      const newPost = new Post({
        ...post(link.request.res.responseUrl),
        user: signedUser._id,
      });
      await newPost.save();

      await User.findByIdAndUpdate(signedUser._id, {
        $addToSet: {
          postsCreated: {
            post: newPost._id,
          },
        },
      });
    } catch (error) {
      console.log("this is broken" + error + i);
    }
  }
  res.send("seed done");
});

exports.getSinglePost = asyncHandler(async (req, res) => {
  const { pid: postId } = req.params;

  const singlePost = await Post.findById(postId)
    .populate({ path: "user", select: "avatar username _id" })
    .populate({ path: "postComments.user", select: "avatar username _id" });

  sendSuccessResponse({ res, data: { post: singlePost } });
});

exports.createPost = asyncHandler(async (req, res) => {
  const signedUser = req.user;
  const { media, hideComments, location, hideStats, tags, description } =
    req.body;
  const socket = req.app.get("socketIo");
  let newPost, finalPost;

  newPost = new Post({
    media,
    description: description,
    tags,
    hideComments,
    hideStats,
    location,
    user: signedUser._id,
  });

  newPost = await newPost.save();

  await User.findByIdAndUpdate(signedUser._id, {
    $addToSet: {
      postsCreated: { post: newPost._id, time: moment().format("L") },
    },
  });

  finalPost = await Post.findById(newPost._id)
    .populate({
      path: "user",
      select: "username avatar email bio fullName",
    })
    .exec();

  // res.status(201).json({ post: finalPost });
  sendSuccessResponse({ res, statusCode: 201, data: { post: finalPost } });

  // socket.in(signedUser._id.toString()).emit("post created");

  // const user = await User.findById(signedUser._id, "followerUsers");

  // const following = user.followerUsers.map((item) => item.user.toString());

  // for (let flId of following) {
  //   await socket.in(flId).emit("new post", finalPost);
  // }
});

exports.uploadMedia = asyncHandler(async (req, res) => {
  const { media } = req.body;

  let results;

  if (!media) return sendErrorResponse({ res, statusCode: 400 });

  results = await uploadFiles(media, { folder: "instagram_clone" });

  sendSuccessResponse({ res, data: { results } });
});

exports.getFilters = asyncHandler(async (req, res) => {
  const contents = fs.readFileSync(
    path.resolve("..", "server", "src", "templates", "filter.json"),
    { encoding: "utf8" }
  );
  const filters = JSON.parse(contents);
  sendSuccessResponse({ res, data: { filters: filters.filters } });
});

exports.removeMedia = asyncHandler(async (req, res) => {
  const { media } = req.body;
  let results;

  // add validator

  if (!media) return sendErrorResponse({ res, statusCode: 400 });

  results = await deleteFiles(media);
  sendSuccessResponse({ res, data: { results } });
});

exports.savePost = asyncHandler(async (req, res) => {
  const { pid: postId } = req.query;
  const { id: userId } = req.user;
  const socket = req.app.get("socketIo");

  const requestedPost = await Post.exists({ _id: postId });

  if (!requestedPost) return sendErrorResponse({ res, statusCode: 404 });

  const userSaveUpdate = await User.updateOne(
    { _id: userId, "postsSaved.post": { $ne: postId } },
    {
      $addToSet: { postsSaved: { post: postId, time: moment().format("L") } },
    }
  );
  const postSaveUpdate = await Post.updateOne(
    { _id: postId, "postSaves.user": { $ne: userId } },
    { $addToSet: { postSaves: { user: userId, time: moment().format("L") } } }
  );

  // unsave
  if (
    userSaveUpdate.modifiedCount === 0 ||
    postSaveUpdate.modifiedCount === 0
  ) {
    await User.updateOne(
      { _id: userId },
      { $pull: { postsSaved: { post: postId } } }
    );
    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          postSaves: { user: userId },
        },
      }
    );
  }

  sendSuccessResponse({ res });

  // await socket.in(userId.toString()).emit("post save", postId, userId);
});

exports.reportPost = asyncHandler(async (req, res) => {
  const { pid: postId } = req.query;
  const { id: userId } = req.user;
  const { message } = req.body;

  const requestedPost = await Post.exists({ _id: postId });

  if (!requestedPost) return sendErrorResponse({ res, statusCode: 404 });

  Post.findByIdAndUpdate(postId, {
    $addToSet: { postReports: { user: userId, message } },
  });

  sendSuccessResponse({ res });
});

// exports.sharePost = asyncHandler(async (req, res) => {});

exports.removePost = asyncHandler(async (req, res) => {
  const { pid: postId } = req.query;
  const { _id: userId } = req.user;

  const requestedPost = await Post.exists({ _id: postId });

  if (!requestedPost) return sendErrorResponse({ res, statusCode: 404 });

  const post = await Post.findById(postId).select("media");

  await deleteFiles(post.media);

  await User.updateMany({}, { $pull: { postsLiked: { post: postId } } });
  await User.updateMany({}, { $pull: { postsSaved: { post: postId } } });

  await User.findByIdAndUpdate(userId, {
    $pull: { postsCreated: { post: postId } },
  });

  await Post.findByIdAndRemove(postId);

  sendSuccessResponse({ res });
});

exports.updatePost = asyncHandler(async (req, res) => {
  // description hashtags tags
  const { } = req.body;
  const { } = req.query;

  // post updates
});

exports.likePost = asyncHandler(async (req, res) => {
  const { pid: postId } = req.query;
  const { _id: userId } = req.user;
  const socket = req.app.get("socketIo");

  if (!postId) return sendErrorResponse({ res, statusCode: 404 });

  const requestedPost = await Post.exists({ _id: postId });

  if (!requestedPost) return sendErrorResponse({ res, statusCode: 404 });

  const time = moment().format("L");

  const userLikeUpdate = await User.updateOne(
    { _id: userId, "postsLiked.post": { $ne: postId } },
    { $addToSet: { postsLiked: { post: postId, time } } }
  );
  const postLikeUpdate = await Post.updateOne(
    { _id: postId, "postLikes.user": { $ne: userId } },
    {
      $addToSet: {
        postLikes: { user: userId, time },
      },
    }
  );

  // unlike
  if (
    userLikeUpdate.modifiedCount === 0 ||
    postLikeUpdate.modifiedCount === 0
  ) {
    await User.updateOne(
      { _id: userId },
      { $pull: { postsLiked: { post: postId } } }
    );
    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          postLikes: { user: userId },
        },
      }
    );
  }

  sendSuccessResponse({ res });

  // await socket.emit("post like", postId, userId);
});

exports.pinPost = asyncHandler(async (req, res) => {
  const { pid } = req.query;

  const pinUpdate = await Post.updateOne({ _id: pid }, { $set: { pin: { isPin: true, time: Date.now() } } })

  if (pinUpdate.modifiedCount === 0) {
    await Post.updateOne({ _id: pid }, { $set: { pin: { isPin: false } } })
  }

  sendSuccessResponse({ res });
});

exports.getFeed = asyncHandler(async (req, res) => {
  const signedUser = req.user;
  const { off, lmt, type, select } = req.query;
  const limit = Number(lmt) || 10;
  const offset = Number(off) * limit || 0;
  const obSignedUserId = new Types.ObjectId(signedUser._id);
  const rootUserId = new Types.ObjectId('64bd7cfc75067b0d7f2bceaa');

  const user = await User.findById(signedUser._id, "followingUsers");

  const following = user.followingUsers.map((item) => item.user);

  following.push(obSignedUserId, rootUserId);

  const postCount = await Post.find({ user: { $in: following } }).count({});

  const posts = await Post.aggregate([
    {
      $match: {
        user: { $in: following },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $project: {
        description: 1,
        location: 1,
        media: 1,
        tags: 1,
        isCommentOff: 1,
        hideStats: 1,
        hideComments: 1,
        postComments: 1,
        comments: 1,
        postLikes: 1,
        createdAt: 1,
        postSaves: 1,
        author: {
          _id: 1,
          avatar: 1,
          fullName: 1,
          username: 1,
          bio: 1,
          email: 1,
        },
      },
    },
  ]);

  sendSuccessResponse({ res, data: { posts: posts, total: postCount } });
});

exports.getExplore = asyncHandler(async (req, res) => {
  const { off, lmt } = req.query;
  const limit = Number(lmt) || 20;
  const offset = Number(off) * limit || 0;
  let posts;

  const postCount = await Post.find().count({});

  posts = await Post.find()
    .skip(offset)
    .limit(limit)
    .populate({
      path: "user",
      select: "_id username avatar",
    })
    .select(
      "postLikes _id media postComments postSaves location createdAt user"
    );

  posts = _.sortBy(posts, ["postLikes", "postComments", "postSaves"]);

  sendSuccessResponse({ res, data: { posts, total: postCount } });
});

