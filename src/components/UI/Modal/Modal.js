import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

const modalAnimationTiming = {
    enter: 400,
    exit: 1000
};

const Modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop visible={props.visible} onClick={props.onModalClosed} />
            <CSSTransition
                mountOnEnter
                unmountOnExit
                in={props.visible}
                timeout={modalAnimationTiming}
                classNames={{
                    enter: '',
                    enterActive: styles.ModalOpen,
                    exit: '',
                    exitActive: styles.ModalClosed
                }}>
                <div className={styles.Modal}>
                    {props.children}
                </div>
            </CSSTransition>
        </React.Fragment>
    );
}

export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.visible === prevProps.visible &&
        nextProps.children === prevProps.children
);