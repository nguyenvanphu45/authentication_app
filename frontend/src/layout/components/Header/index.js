import React, { useEffect } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import imageSvg from '~/assets/svg';
import { FaUserCircle } from 'react-icons/fa';
import { BiUser, BiSolidGroup } from 'react-icons/bi';
import { BsCaretDownFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../../components/Popper/Menu';
import { dispatchLogoutUser } from '../../../redux/actions/authActions';
import { createAxios } from '../../../utils/api';

const cx = classNames.bind(styles);

function Header() {
    const auth = useSelector((state) => state.auth);
    const { user, isLogged } = auth;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, dispatchLogoutUser);

    const logout = async () => {
        try {
            await axiosJWT.post('/auth/logout', user._id, {
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
            icon: <BiSolidGroup />,
            title: 'Group chat',
            to: '/chat',
        },
        {
            icon: <TbLogout />,
            title: 'Logout',
            to: '/',
            onClick: logout,
        },
    ];

    useEffect(() => {
        if (!isLogged) {
            navigate('/login');
        }
    }, [isLogged]);

    return (
        <div className={cx('header')}>
            <img src={imageSvg.logo} alt="" />
            {isLogged ? (
                <Menu items={userMenu}>
                    <div className={cx('user')}>
                        {user.email}
                        <BsCaretDownFill className={cx('icon-down')} />
                    </div>
                </Menu>
            ) : (
                <Link to="/login" className={cx('user')}>
                    <BiUser className={cx('icon-user')} />
                    Login
                </Link>
            )}
        </div>
    );
}

export default Header;
