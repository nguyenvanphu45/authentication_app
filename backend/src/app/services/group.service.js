const Group = require('../models/groups');
const User = require('../models/users');

const groupService = {
    fetchGroup: (id) => {
        return new Promise((resolve, reject) => {
            try {
                Group.find({ users: { $elemMatch: { $eq: id } } })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password')
                    .populate('latestMessage')
                    .sort({ updateAt: -1 })
                    .then(async (results) => {
                        results = await User.populate(results, {
                            path: 'latestMessage.sender',
                            select: 'name description pic',
                        });
                        resolve(results);
                    });
            } catch (e) {
                reject(e);
            }
        });
    },
    create: (data, admin) => {
        return new Promise(async (resolve, reject) => {
            try {
                let users = JSON.parse(data.users);

                users.push(admin.id);

                const groupChat = await Group.create({
                    name: data.name,
                    description: data.description,
                    users: users,
                    groupAdmin: admin.id,
                });

                const fullGroupChat = await Group.findOne({ _id: groupChat._id })
                    .populate('users', '-password')
                    .populate('groupAdmin', '-password');

                resolve(fullGroupChat);
            } catch (e) {
                reject(e);
            }
        });
    },
};

module.exports = groupService;
