import React, { useEffect } from 'react';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import FrameInfo from '../../components/FrameInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchGetUser, fetchUser } from '../../redux/actions/authActions';
import { createAxios } from '../../utils/api';
import noImage from '~/assets/image/no-image.png';

const cx = classNames.bind(styles);

function ProfilePage() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, dispatchGetUser);

    useEffect(() => {
        const getUser = () => {
            return fetchUser(user._id, axiosJWT).then((res) => {
                dispatch(dispatchGetUser({ ...res.data.user }));
            });
        };
        getUser();
    }, []);

    return (
        <>
            <div className={cx('title')}>
                <h2>Personal info</h2>
                <p>Basic info, like your name and photo</p>
            </div>
            <FrameInfo>
                <div className={cx('frame-header')}>
                    <div className={cx('frame-header__title')}>
                        <h4>Profile</h4>
                        <p>Some info may be visible to other people</p>
                    </div>
                    <button className={cx('frame-header__btn')}>
                        <Link to={`/edit/${user._id}`} className={cx('edit')}>
                            Edit
                        </Link>
                    </button>
                </div>
                <div className={cx('frame-body')}>
                    <div className={cx('border')}>
                        <div className={cx('padding', 'padding-img')}>
                            <p>Photo</p>
                            <img src={!user.image ? noImage : user.image} alt="" />
                        </div>
                    </div>
                    <div className={cx('border')}>
                        <div className={cx('padding', 'padding-name')}>
                            <p>Name</p>
                            <h4>{user.name}</h4>
                        </div>
                    </div>
                    <div className={cx('border')}>
                        <div className={cx('padding')}>
                            <p>Bio</p>
                            <h4>{user.bio}</h4>
                        </div>
                    </div>
                    <div className={cx('border')}>
                        <div className={cx('padding')}>
                            <p>Phone</p>
                            <h4>{user.phone}</h4>
                        </div>
                    </div>
                    <div className={cx('border')}>
                        <div className={cx('padding')}>
                            <p>Email</p>
                            <h4>{user.email}</h4>
                        </div>
                    </div>
                    <div className={cx('border')}>
                        <div className={cx('padding')}>
                            <p>Password</p>
                            <input type="test" readOnly value={user.password} />
                        </div>
                    </div>
                </div>
            </FrameInfo>
        </>
    );
}

export default ProfilePage;
