import moment from 'moment';

export const dateFormat = (date) => {
    const createAt = moment(date);
    const today = moment();

    if (createAt.isSame(today, 'd')) {
        return `Today at ${createAt.format('h:mm A')}`;
    } else if (createAt.isSame(today.subtract(1, 'days'), 'd')) {
        return `Yesterday at ${createAt.format('h:mm A')}`;
    } else {
        return createAt.format('dddd [at] h:mm A');
    }
};
