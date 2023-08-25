import React, { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import styles from './ScrollableMessage.module.scss';
import classNames from 'classnames/bind';
import { isSameSender } from '../../utils/messageUtils';
import { dateFormat } from '../../utils/dateFormat';
import moment from 'moment';

const cx = classNames.bind(styles);

function ScrollableMessage({ messages }) {
    const [messagesByDate, setMessagesByDate] = useState({});

    useEffect(() => {
        const messagesByDate = {};
        for (const message of messages) {
            const createAt = moment(message.createAt);
            const date = createAt.format('ll');
            if (!messagesByDate[date]) {
                messagesByDate[date] = [];
            }
            messagesByDate[date].push(message);
        }
        setMessagesByDate(messagesByDate);
    }, [messages]);
    return (
        <ScrollableFeed>
            {Object.keys(messagesByDate).map((date, idx) => (
                <div key={idx}>
                    <div key={date} className={cx('line')}>
                        {date}
                    </div>
                    {messagesByDate[date].map((message, index) => {
                        const createAt = moment(message.createAt);
                        const formattedCreateAt = dateFormat(createAt);
                        return (
                            <div className={cx('messages')} key={index}>
                                {isSameSender(messages, message, index) ? (
                                    <div className={cx('member')}>
                                        <img src={message.sender.image} alt="" />
                                        <div className={cx('member-msg')}>
                                            <div className={cx('name')}>
                                                <p>{message.sender.name}</p>
                                                <span>{formattedCreateAt}</span>
                                            </div>
                                            <h4>{message.content}</h4>
                                        </div>
                                    </div>
                                ) : (
                                    <h4 className={cx('not-member')}>{message.content}</h4>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </ScrollableFeed>
    );
}

export default ScrollableMessage;
