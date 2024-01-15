// CommentService.js

class CommentService {
    constructor(commentRepository, redisClient) {
        this.commentRepository = commentRepository;
        this.redisClient = redisClient;
    }

    async createComment({ content, userId, username, channelId }) {
        try {
            const newComment = await this.commentRepository.create({
                content,
                userId,
                username,
                channelId,
            });
            return newComment;
        } catch (error) {
            console.error(error);
            throw new Error('Error creating comment');
        }
    }

    async getComments() {
        try {
            const comments = await this.commentRepository.findAll();
            return comments;
        } catch (error) {
            console.error(error);
            throw new Error('Error getting comments');
        }
    }

    async updateCommentStatus(commentId, status) {
        try {
            let comment;

            const result = await this.redisClient.get(commentId);

            if (result) {
                comment = JSON.parse(result);
            } else {
                comment = await this.commentRepository.findById(commentId);
                if (!comment) {
                    throw new Error('Comment not found');
                }
            }

            comment = await this.commentRepository.findOneAndUpdate(
                { _id: commentId },
                { status, statusEventTime: new Date() },
                { new: true }
            )

            // Update or set the comment in Redis
            await this.redisClient.set(commentId, JSON.stringify(comment), 'EX', 60);

            return comment;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating comment status');
        }
    }
}

module.exports = CommentService;
