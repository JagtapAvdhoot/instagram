const { randomUUID } = require('crypto');
const asyncHandler = require("../middlewares/asyncHandler");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/apiResponse');
const Post = require('../models/post.model');
const { generateDateNow } = require('../utils/date');

exports.addComment = asyncHandler(async (req, res) => { // working as expected
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
        createdAt: generateDateNow(),
        commentReports: [],
        isHidden: false
    }

    await Post.updateOne({ _id: pid }, {
        $push: {
            postComments: commentObject
        }
    })

    sendSuccessResponse({ res, data: commentObject })
})
exports.deleteComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === cid);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    if (!post.postComments[doesCommentExists].user === signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    const postUpdate = await Post.findOneAndUpdate(
        { _id: pid, 'postComments.id': cid },
        {
            $pull: {
                'postComments.$.id': cid
            }
        },
        { new: true }
    );

    console.log('comment.controller.js:56', postUpdate);
    sendSuccessResponse({ res })
})
exports.likeComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === cid);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    const isLiked = post.postComments[doesCommentExists].commentLikes.findIndex(like => like.user === signedUser._id);

    let postUpdate = await Post.updateOne(
        { _id: pid, 'postComments.id': cid, 'postComments.commentLikes.user': { $ne: signedUser._id } },
        {
            $addToSet: {
                'postComments.$.commentLikes': {
                    user: signedUser._id,
                    createdAt: generateDateNow(),
                }
            }
        }
    )

    if (postUpdate.modifiedCount === 0) {
        postUpdate = await Post.updateOne(
            { _id: pid, 'postComments.id': cid },
            {
                $pull: {
                    'postComments.$.commentLikes': {
                        user: signedUser._id,
                    }
                }
            }
        )
    }

    console.log(postUpdate, 'postUpdate from 97 line')

    sendSuccessResponse({ res })
})
exports.addCommentReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;
    const { message } = req.body;

    const post = await Post.findOne({ _id: pid })
    if (!post) return sendErrorResponse({ res, statusCode: 404 })
    const comment = post.postComments.findIndex(comment => comment.id === cid);
    if (comment === -1) return sendErrorResponse({ res, statusCode: 404 })

    const commentObject = {
        id: randomUUID(),
        message,
        user: signedUser._id,
        commentLikes: [],
        replyingTo: post.postComments[comment].user,
        createdAt: generateDateNow(),
        commentReports: [],
        isHidden: false,
    }

    const postUpdate = await Post.findOneAndUpdate(
        {
            _id: pid,
            'postComments.id': cid
        },
        {
            $push: {
                'postComments.$.commentReplies': commentObject
            }
        },
        { new: true }
    );

    sendSuccessResponse({ res, data: commentObject })
})
exports.deleteCommentReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid, rid } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.comments.findIndex(comment => comment.id === cid);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    const doesReplyExists = post.comments[doesCommentExists].commentReplies.findIndex(reply => reply.id === rid)

    if (doesReplyExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    if (post.comments[doesCommentExists].commentReplies[doesReplyExists].user !== signedUser._id || post.user !== signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    const postUpdate = await Post.updateOne(
        {
            _id: pid,
            'postComments.id': cid,
        },
        {
            $pull: {
                'postComments.$.commentReplies.$[reply]': rid
            }
        },
        {
            applyFil
        }
    )

    sendSuccessResponse({ res })
})
exports.likeCommentReply = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId, replyId } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === commentId);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    const doesReplyExists = post.postComments[doesCommentExists].commentReplies.findIndex(reply => reply.id === replyId)

    if (doesReplyExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    const isLiked = post.postComments[doesCommentExists].commentReplies[doesReplyExists].findIndex(like => like.user === signedUser._id);

    if (isLiked !== -1) {
        post.postComments[doesCommentExists].commentReplies[doesReplyExists].commentLikes.splice(isLiked, 1);
    } else {
        post.postComments[doesCommentExists].commentReplies[doesReplyExists].commentLikes.push({ user: signedUser._id, time: Date.now() })
    }

    await post.save()

    sendSuccessResponse({ res })
})
exports.pinComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, commentId } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === commentId);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 400 })

    if (!post.postComments[doesCommentExists].user === signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    const isPinned = post.postComments[doesCommentExists].pin.isPin

    if (isPinned) {
        post.postComments[doesCommentExists].pin.isPin = false
    } else {
        post.postComments[doesCommentExists].pin.isPin = true
        post.postComments[doesCommentExists].pin.time = Date.now()
    }

    await post.save()

    sendSuccessResponse({ res })
})
exports.updateComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;
    const { message } = req.body;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === cid);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    if (post.postComments[doesCommentExists].user !== signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    const postUpdate = await Post.updateOne(
        {
            _id: pid,
            'postComments.id': cid
        },
        {
            $set: {
                'postComments.$.message': message
            }
        }
    )

    sendSuccessResponse({ res })
})
exports.hideComment = asyncHandler(async (req, res) => {
    const signedUser = req.user;
    const { pid, cid } = req.query;

    const post = await Post.findOne({ _id: pid })

    const doesCommentExists = post.postComments.findIndex(comment => comment.id === cid);

    if (doesCommentExists === -1) return sendErrorResponse({ res, statusCode: 404 })

    if (post.postComments[doesCommentExists].user !== signedUser._id) return sendErrorResponse({ res, statusCode: 403 })

    const isHidden = post.postComments[doesCommentExists].isHidden

    const postUpdate = await Post.updateOne(
        {
            _id: pid,
            'postComments.id': cid
        },
        {
            $set: {
                'postComments.$.isHidden': !isHidden
            }
        }
    )

    sendSuccessResponse({ res })
})