const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'new',
  },
  statusEventTime: {
    type: Date
  }
}, { versionKey: false });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;