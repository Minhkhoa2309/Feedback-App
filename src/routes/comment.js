// commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// POST /api/comment
router.post('/api/comment', async (req, res) => {
  try {
    const { content, userId, username, channelId } = req.body;
    
    const newComment = new Comment({
      content,
      userId,
      username,
      channelId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/comments
router.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find();

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/comment/status/:status
router.put('/api/comment/status/:status', async (req, res) => {
  const { status } = req.params;

  try {
    const commentId = req.body.commentId; // Assuming you send commentId in the request body

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment.status = status;
    comment.statusEventTime = new Date();

    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
