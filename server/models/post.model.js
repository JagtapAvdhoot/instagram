const { Schema, model } = require("mongoose");
const Comment = require("./comment.model");

const postSchema = new Schema(
  {
    description: String,
    location: String,
    media: [],
    tags: [],
    pin: {
      isPin: Boolean,
      time: Date
    },
    hideComments: {
      type: Boolean,
      default: false,
    },
    hideStats: {
      type: Boolean,
      default: false,
    },
    postReports: [],
    postLikes: [],
    postComments: [],
    postSaves: [],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

module.exports = Post;
