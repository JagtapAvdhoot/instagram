const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    fullName: String,
    email: String,
    password: String,
    avatar: String,
    website: String,
    bio: String,
    token: {
      token: String,
      expire: Date,
    },
    followerUsers: [],
    followingUsers: [],
    userReports: [],
    postsSaved: [],
    postsCreated: [],
    postsLiked: [],
    favorites: [],
    notifications: [], //advance stuff
    previousSearch: [],
    followingRequests: [], //advance stuff
    private: {
      type: Boolean,
      default: false,
    }, //advance stuff
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
