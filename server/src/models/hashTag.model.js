const { Schema, model } = require("mongoose");
// TODO: this is not working
// TODO: changes require
const postSchema = new Schema(
  {
    description: String,
    location: String,
    media: [],
    postReports: [],
    hashTags:[],
    tags:[],
    postComments: [],
    postLikes: [],
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
