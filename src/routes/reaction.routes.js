const express = require('express');
const router = express.Router();
const ReactionController = require('../controllers/reaction.controller');

router.get('/:publicId',ReactionController.getReaction);
router.post('/',ReactionController.createReaction);
module.exports = router;