import React, { useState } from 'react';
import styles from './Group.module.scss';
import classNames from 'classnames/bind';
import SideBar from '../../layout/components/SideBar';
import imageSvg from '~/assets/svg';
import Modal from 'react-modal';
import FormModal from '../../components/FormModal';
import GroupChannel from '../../layout/components/GroupChannel';

const cx = classNames.bind(styles);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        overflow: 'visible',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        padding: 0,
        border: 'none',
        borderRadius: '24px',
    },
    overlay: {
        background: '#120f1380',
    },
};

function GroupPage() {
    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <div className={cx('wrapper')}>
            <SideBar>
                <div className={cx('title', 'space')}>
                    <h3>Channels</h3>
                    <button onClick={() => setOpenModal(true)}>
                        <img src={imageSvg.plus} alt="" />
                    </button>
                    <Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
                        <FormModal onClose={closeModal} />
                    </Modal>
                </div>
                <GroupChannel />
            </SideBar>
            <div className={cx('body')}></div>
        </div>
    );
}

export default GroupPage;
