import React from 'react';
import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaUserCircle } from 'react-icons/fa';
import { TbLogout } from 'react-icons/tb';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../../components/Popper/Menu';
import { createAxios } from '../../../utils/api';
import { dispatchLogoutUser } from '../../../redux/actions/authActions';

const cx = classNames.bind(styles);

function SideBar({ children }) {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, dispatchLogoutUser);

    const logout = async () => {
        try {
            await axiosJWT.post('http://localhost:5000/auth/logout', user._id, {
                withCredentials: true,
            });
            localStorage.removeItem('token');
            dispatch(dispatchLogoutUser());
        } catch (error) {
            console.log(error);
        }
    };

    const userMenu = [
        {
            icon: <FaUserCircle />,
            title: 'My profile',
            to: `/profile`,
        },
        {
            icon: <img src={imageSvg.tweeter} alt="" />,
            title: 'Tweeter',
            to: '/chat',
        },
        {
            icon: <TbLogout />,
            title: 'Logout',
            to: '/',
            onClick: logout,
        },
    ];

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>{children}</div>
            <div className={cx('footer')}>
                <div className={cx('user')}>
                    <img src={user.image} alt="" />
                    <h2>{user.name}</h2>
                </div>
                <Menu items={userMenu} sidebar>
                    <div className={cx('icon')}>
                        <FiChevronDown className={cx('icon-down')} />
                    </div>
                </Menu>
            </div>
        </div>
    );
}

export default SideBar;
