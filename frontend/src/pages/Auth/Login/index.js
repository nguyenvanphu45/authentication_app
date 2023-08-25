import React, { useState } from 'react';
import styles from '../Auth.module.scss';
import className from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsGithub, BsTwitter, BsGoogle } from 'react-icons/bs';
import { MdMail } from 'react-icons/md';
import { BiSolidLock } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { dispatchLogin } from '~/redux/actions/authActions';
import { showErrMsg, showSuccessMsg } from '../../../components/Notification';

const cx = className.bind(styles);

const initialState = {
    email: '',
    password: '',
};

function LoginPage() {
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password, err, success } = user;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                '/auth/login',
                {
                    email,
                    password,
                },
                { withCredentials: true, credentials: 'same-origin' },
            );

            setUser({ ...user, error: '', success: res.data.message });

            dispatch(dispatchLogin({ ...res.data.user }));
            localStorage.setItem('token', res.data.user.accessToken);
            navigate('/chat');
        } catch (err) {
            console.log(err);
            err.response.data.message && setUser({ ...user, err: err.response.data.message, success: '' });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <img src={imageSvg.logo} alt="" />
                <div className={cx('title')}>
                    <h3>Login</h3>
                </div>
                <div className={cx('input')}>
                    <MdMail className={cx('input-icon')} />
                    <input type="email" value={email} name="email" onChange={handleChangeInput} placeholder="Email" />
                </div>
                <div className={cx('input')}>
                    <BiSolidLock className={cx('input-icon')} />
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                        placeholder="Password"
                    />
                </div>
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
                <button className={cx('btn')}>Login</button>
                <div className={cx('social')}>
                    <span>or continue with these social profile</span>
                    <div className={cx('icons')}>
                        <span>
                            <BsGoogle />
                        </span>
                        <span>
                            <FaFacebookSquare />
                        </span>
                        <span>
                            <BsTwitter />
                        </span>
                        <span>
                            <BsGithub />
                        </span>
                    </div>
                </div>
                <p className={cx('account')}>
                    Don’t have an account yet? <Link to="/register">Register</Link>
                </p>
            </form>
            <div className={cx('create-by')}>
                <p className={cx('username')}>
                    created by <span>username</span>
                </p>
                <p className={cx('name')}>Your name</p>
                <p>devChallenges.io</p>
            </div>
        </div>
    );
}

export default LoginPage;
