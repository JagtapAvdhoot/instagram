const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        parentPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        comments: [],
    },
    { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
