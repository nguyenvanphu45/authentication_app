const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        phone: {
            type: Number,
        },
        bio: {
            type: String,
            maxlength: 150,
            minlength: 0,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

let User = mongoose.model('User', userSchema);

module.exports = User;
