const asyncHandler = require('express-async-handler');
const chatService = require('../services/chat.service');

const chatController = {
    sendMessage: asyncHandler(async (req, res) => {
        try {
            let senderId = req.user.id;
            let response = await chatService.sendMessage(req.body, senderId);

            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    }),
    allChat: asyncHandler(async (req, res) => {
        try {
            let response = await chatService.allChat(req.params.groupId);
            res.status(200).json(response);
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join('');
                return res.status(500).json({ msg: err });
            }
            res.status(500).json({ msg: error.message });
        }
    }),
};

module.exports = chatController;
