const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
            require: [true, 'Invalid data passed into request'],
            trim: true,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, 'Invalid data passed into request'],
            ref: 'Group',
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        createAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timeStamps: true },
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
