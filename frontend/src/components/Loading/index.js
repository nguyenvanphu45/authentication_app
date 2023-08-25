import React from 'react';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import Lottie from 'lottie-react';
import loadingAnimation from '~/assets/animation/loading.json';

const cx = classNames.bind(styles);

function Loading({ className }) {
    return (
        <div className={cx('wrapper')}>
            <Lottie animationData={loadingAnimation} className={cx('loading-icon', className)} loop={true} />
        </div>
    );
}

export default Loading;
