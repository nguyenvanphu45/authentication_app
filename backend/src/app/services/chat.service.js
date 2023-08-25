const Chat = require('../models/chats');
const Group = require('../models/groups');
const User = require('../models/users');

const chatService = {
    sendMessage: (data, senderId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { content, groupId } = data;

                let newMessage = {
                    sender: senderId,
                    content: content,
                    group: groupId,
                };

                let message = await Chat.create(newMessage);

                message = await message.populate({ path: 'sender', select: 'name image' });
                message = await message.populate('group');
                message = await User.populate(message, {
                    path: 'group.users',
                    select: 'name image',
                });

                await Group.findByIdAndUpdate(groupId, { latestMessage: message });

                resolve(message);
            } catch (e) {
                reject(e);
            }
        });
    },
    allChat: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const messages = await Chat.find({ group: id }).populate('sender', 'name image').populate('group');

                resolve(messages);
            } catch (e) {
                reject(e);
            }
        });
    },
};

module.exports = chatService;
