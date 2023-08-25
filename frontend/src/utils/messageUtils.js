export const isSameSender = (messages, msg, index) => {
    if (index === 0) {
        return true;
    }
    return index > 0 && messages[index - 1].sender._id !== msg.sender._id;
};
