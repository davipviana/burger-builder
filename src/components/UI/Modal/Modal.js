import React, { Component } from 'react';

import Wrapper from '../../../hoc/Wrapper/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

class Modal extends Component {

    shouldComponentUpdate(nextProps, _) {
        return (nextProps.visible !== this.props.visible);
    }

    render() {
        return (
            <Wrapper>
                <Backdrop visible={this.props.visible} onClick={this.props.onModalClosed} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)'
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

export default Modal;