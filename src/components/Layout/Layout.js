import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    hideSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleClickHandler = () => {
        this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
    }

    render() {
        return (
            <Wrapper>
                <Toolbar onClickDrawerToggle={this.sideDrawerToggleClickHandler} />
                <SideDrawer
                    visible={this.state.showSideDrawer}
                    onClose={this.hideSideDrawerHandler} />
                <div>SideDrawer, Backdrop</div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

export default Layout;