const User = require('../models/users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authController = {
    // [POST] /auth/login
    login: async (req, res) => {
        try {
            let { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user || !user.comparePassword(password)) {
                return res.status(400).json({
                    message: 'Email or Password incorrect!',
                });
            }

            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
            });

            const { ...others } = user._doc;

            res.status(200).json({
                message: 'Login success!',
                user: { ...others, accessToken },
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join();
                return res.status(500).json({ message: err });
            }
            return res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /auth/register
    register: async (req, res) => {
        try {
            const { email, password } = req.body;

            const findEmail = await User.findOne({ email });

            if (findEmail) {
                return res.status(400).json({
                    message: 'This email already exists',
                });
            }

            let newUser = await new User({
                email: email,
                password: password,
            });

            let user = await newUser.save();

            res.status(200).json({
                message: 'Register success!',
                user: user,
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                let err = Object.values(error.errors)
                    .map((val) => val.message)
                    .join();
                return res.status(500).json({ message: err });
            }
            return res.status(500).json({ msg: error.message });
        }
    },

    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: '3d' },
        );
    },

    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: '90d' },
        );
    },

    // [POST] /auth/refresh
    requestRefreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refreshToken) {
                return res.status(400).json({ message: 'Please login now!' });
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
                if (err) {
                    return res.status(401).json({ message: 'Not token!' });
                }

                const newAccessToken = authController.generateAccessToken(user);

                res.status(200).json({ accessToken: newAccessToken });
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    // [POST] /auth/logout
    logout: async (req, res) => {
        res.clearCookie('refreshToken');
        res.status(200).json({ msg: 'Logged out!' });
    },
};

module.exports = authController;
