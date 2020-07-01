import React, { Component } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

const modalAnimationTiming = {
    enter: 400,
    exit: 1000
};

class Modal extends Component {

    shouldComponentUpdate(nextProps, _) {
        return (nextProps.visible !== this.props.visible || nextProps.children !== this.props.children);
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop visible={this.props.visible} onClick={this.props.onModalClosed} />
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={this.props.visible}
                    timeout={modalAnimationTiming}
                    classNames={{
                        enter: '',
                        enterActive: styles.ModalOpen,
                        exit: '',
                        exitActive: styles.ModalClosed
                    }}>
                    <div className={styles.Modal}>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </React.Fragment>
        );
    }
}

export default Modal;