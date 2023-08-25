const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { createCanvas } = require('canvas');

const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Please fill in all fields!'],
            unique: true,
            match: [regexEmail, 'Email or Password incorrect!'],
        },
        password: {
            type: String,
            minlength: [6, 'Password at least 6 characters!'],
            required: [true, 'Please fill in all fields!'],
            match: [
                regexPassword,
                'Password contain at least one uppercase letter, one lowercase letter, and one number!',
            ],
        },
        name: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            maxlength: 150,
            minlength: 0,
            default: '',
        },
        image: {
            type: String,
            default: ({ email }) => {
                const canvas = createCanvas(100, 100);
                const firstChar = email[0].toUpperCase();
                const ctx = canvas.getContext('2d');

                ctx.fillStyle = 'blue';
                ctx.fillRect(0, 0, 100, 100);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '70px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(firstChar, 50, 50);

                const buffer = canvas.toBuffer('image/png');
                const url = `data:image/png;base64,${buffer.toString('base64')}`;
                return url;
            },
        },
    },
    { timestamps: true },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.password);
};

let User = mongoose.model('User', userSchema);

module.exports = User;
