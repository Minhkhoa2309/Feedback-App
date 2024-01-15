// commentRoutes.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const { Redis } = require('ioredis');
const redis = require('../lib/redis');

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
    const commentId = req.body.commentId;

    const result = await redis.get(commentId);

    let comment;

    if (result) {
      comment = JSON.parse(result);
    } else {
      comment = await Comment.findById(commentId);
    }

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    comment = await Comment.findOneAndUpdate(
      { id: commentId }, 
      { status: status, statusEventTime: new Date() }, 
      { new: true })

    await redis.set(commentId, JSON.stringify(comment), 'EX', 60);

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
