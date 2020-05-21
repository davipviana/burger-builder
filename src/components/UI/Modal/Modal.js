import React from 'react';

import styles from './Modal.module.css';

const Modal = (props) => (
    <div
        className={styles.Modal}
        style={{
            transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)'
        }}>
        {props.children}
    </div>
);

export default Modal;