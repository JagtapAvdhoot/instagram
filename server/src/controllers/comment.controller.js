const { randomUUID } = require('crypto');
const asyncHandler = require("../middlewares/asyncHandler");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');
const Post = require('../models/post.model');

exports.addComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid } = req.query;
    const { message } = req.body;

    const commentObject = {
        id: randomUUID(),
        message,
        user: signedUser._id,
        commentLikes: [],
        commentReplies: [],
        pin: {
            isPin: false,
            time: Date.now()
        },
        createdAt: Date.now(),
        commentReports: [],
        isHidden: false
    }

    await Post.updateOne({ _id: pid }, {
        $push: {
            comments: commentObject
        }
    })

    sendSuccessResponse({ res, data: commentObject })
})
exports.deleteComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.comments.findIndex(comment => comment.id === commentId);

    if (!post.comments[doesCommentExists].user === signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 400 })

    post.comments.splice(doesCommentExists, 1)

    await post.save()

    sendSuccessResponse({ res })
})
exports.likeComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.comments.findIndex(comment => comment.id === commentId);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 400 })

    const isLiked = post.comments[doesCommentExists].commentLikes.findIndex(like => like.user === signedUser._id);

    if (isLiked !== -1) {
        post.comments[doesCommentExists].commentLikes.splice(isLiked, 1);
    } else {
        post.comments[doesCommentExists].commentLikes.push({ user: signedUser._id, time: Date.now() })
    }

    await post.save()

    sendSuccessResponse({ res })
})
exports.addCommentReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId, username } = req.query;
    const { message } = req.body;

    const commentObject = {
        id: randomUUID(),
        message,
        user: signedUser._id,
        commentLikes: [],
        replyingTo: username,
        createdAt: Date.now(),
        commentReports: [],
        isHidden: false
    }

    const post = await Post.findOne({ _id: pid })

    const comment = post.comments.findIndex(comment => comment.id === commentId);

    post.comments[comment].commentReplies.push(commentObject)

    await post.save()

    sendSuccessResponse({ res, data: commentObject })
})
exports.deleteCommentReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId, replyId } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.comments.findIndex(comment => comment.id === commentId);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    const doesReplyExists = post.comments[doesCommentExists].commentReplies.findIndex(reply => reply.id === replyId)

    if (doesReplyExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    if (!post.comments[doesCommentExists].commentReplies[doesReplyExists].user === signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    

    post.comments[doesCommentExists]

    await post.save()

    sendSuccessResponse({ res })
})
exports.likeCommentReply = asyncHandler(async (req, res) => {

})
exports.pinComment = asyncHandler(async (req, res) => {

})
exports.updateComment = asyncHandler(async (req, res) => {

})