import React from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

const Modal = (props) => (
    <Wrapper>
        <Backdrop visible={props.visible} />
        <div
            className={styles.Modal}
            style={{
                transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)'
            }}>
            {props.children}
        </div>
    </Wrapper>
);

export default Modal;