import React, { useEffect, useState } from 'react';
import styles from './GroupChannel.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineSearch } from 'react-icons/ai';
import { dispatchGetGroup, dispatchSearchGroups, fetchGroup } from '../../../redux/actions/groupActions';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { groupRemainingSelector } from '../../../redux/selectors/groupSelector';

const cx = classNames.bind(styles);

function GroupChannel() {
    const groups = useSelector(groupRemainingSelector);
    const token = localStorage.getItem('token');

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()
    let axiosJWT = createAxios(groups, dispatch, dispatchGetGroup);

    useEffect(() => {
        if (!token) {
            window.location.reload();
            navigate('/login')
        }

        const getGroup = () => {
            return fetchGroup(axiosJWT).then((res) => {
                dispatch(dispatchGetGroup([...res.data]));
            });
        };

        getGroup();
    }, [groups.length]);

    const handleChange = (e) => {
        setSearch(e.target.value);
        dispatch(dispatchSearchGroups(e.target.value));
    };

    return (
        <div className={cx('search')}>
            <div className={cx('search-input')}>
                <AiOutlineSearch />
                <input type="text" placeholder="Search" onChange={handleChange} value={search} />
            </div>
            <div className={cx('search-list')}>
                {groups.map((group) => {
                    return (
                        <Link to={`/chat/${group._id}`} className={cx('list-item')} key={group._id}>
                            <img src={group.image} alt="" />
                            <p>{group.name}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default GroupChannel;
