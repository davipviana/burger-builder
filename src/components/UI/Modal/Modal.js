import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

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

    renderModalByTransitionState = (state) => {
        const cssStyles = [
            styles.Modal,
            state === 'entering'
                ? styles.ModalOpen
                : state === 'exiting' ? styles.ModalClosed : null
        ];

        return (<div className={cssStyles.join(' ')}>
            {this.props.children}
        </div>);
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop visible={this.props.visible} onClick={this.props.onModalClosed} />
                <Transition in={this.props.visible} timeout={modalAnimationTiming} mountOnEnter unmountOnExit>
                    {state => this.renderModalByTransitionState(state)}
                </Transition>
            </React.Fragment>
        );
    }
}

export default Modal;