const Comment = require('../models/comment');

class CommentRepository {
  async create(commentData) {
    const newComment = new Comment(commentData);
    return newComment.save();
  }

  async findAll() {
    return Comment.find();
  }

  async findById(commentId) {
    return Comment.findById(commentId);
  }

  async update(comment) {
    return comment.save();
  }
  
  async findOneAndUpdate(query, update, options) {
    return Comment.findOneAndUpdate(query, update, options);
  }
}

module.exports = CommentRepository;
