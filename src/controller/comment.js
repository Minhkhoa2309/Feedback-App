// CommentController.js

const CommentService = require('../service/comment');
const CommentRepository = require('../repository/comment');
const redis = require('../lib/redis');

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository, redis);

async function createCommentController(req, res) {
    try {
        const { content, userId, username, channelId } = req.body;
        const newComment = await commentService.createComment({
            content,
            userId,
            username,
            channelId,
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getCommentsController(req, res) {
    try {
        const comments = await commentService.getComments();
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateCommentStatusController(req, res) {
    const { status } = req.params;
    const { commentId } = req.body;

    try {
        const updatedComment = await commentService.updateCommentStatus(commentId, status);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createCommentController,
    getCommentsController,
    updateCommentStatusController,
};
