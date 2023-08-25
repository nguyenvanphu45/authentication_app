const express = require('express');
const middleware = require('../app/middleware/authentication');
const router = express.Router();

const chatController = require('../app/controllers/chat.controller');

router.post('/', middleware.verifyToken, chatController.sendMessage);
router.get('/:groupId', middleware.verifyToken, chatController.allChat);

module.exports = router;
