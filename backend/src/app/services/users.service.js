const User = require('../models/users');
const bcrypt = require('bcrypt');

const usersService = {
    findUserByKeyword: (keyword, user) => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = await User.find(keyword).find({ _id: { $ne: user } });

                resolve({
                    users: users,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    findOne: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id);

                if (!user) {
                    resolve({
                        message: 'User not found',
                    });
                }

                resolve({
                    user: user,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
    update: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { password, ...rest } = data;

                if (password) {
                    const passwordHash = await bcrypt.hash(password, 12);
                    data.password = passwordHash;
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { $set: { password: data.password }, ...rest },
                    { new: true },
                );

                resolve({
                    message: 'Update success!',
                    user: updatedUser,
                });
            } catch (e) {
                reject(e);
            }
        });
    },
};

module.exports = usersService;
