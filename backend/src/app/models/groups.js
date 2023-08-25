const mongoose = require('mongoose');
const { createCanvas } = require('canvas');

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'Please fill all the fields!'],
        },
        description: {
            type: String,
            trim: true,
            required: [true, 'Please fill all the fields!'],
        },
        image: {
            type: String,
            default: ({ name }) => {
                const canvas = createCanvas(100, 100);
                const firstChar = name[0].toUpperCase();
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = '#252329';
                ctx.fillRect(0, 0, 100, 100);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '60px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(firstChar, 50, 50);

                const buffer = canvas.toBuffer('image/png');
                const url = `data:image/png;base64,${buffer.toString('base64')}`;
                return url;
            },
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Please fill all the fields!'],
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

groupSchema.path('users').validate(function (value) {
    return value.length > 2;
}, 'Users length must be greater than to 2');

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
