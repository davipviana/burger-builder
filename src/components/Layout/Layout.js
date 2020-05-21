import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    hideSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    render() {
        return (
            <Wrapper>
                <Toolbar />
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