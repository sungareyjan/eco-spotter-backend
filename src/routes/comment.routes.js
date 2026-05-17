const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');

router.get('/:publicId', CommentController.getCommentsByObservation);
router.post('/',CommentController.createComments);

module.exports = router;
