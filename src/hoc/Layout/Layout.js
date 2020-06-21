import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
            <React.Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    onClickDrawerToggle={this.sideDrawerToggleClickHandler} />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    visible={this.state.showSideDrawer}
                    onClose={this.hideSideDrawerHandler} />
                <div>SideDrawer, Backdrop</div>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);