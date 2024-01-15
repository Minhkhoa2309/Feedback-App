const {
    createCommentController,
    getCommentsController,
    updateCommentStatusController,
  } = require('./controller/comment');

function routes(app) {

    app.post(
        "/api/comment",
        createCommentController
    );

    app.put(
        "/api/comment/status/:status",
        updateCommentStatusController
    );

    app.get(
        "/api/comments",
        getCommentsController
    );

}

module.exports = routes;
