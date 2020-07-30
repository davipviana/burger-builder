import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const hideSideDrawerHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleClickHandler = () => {
        setShowSideDrawer(prevShowSideDrawer => !prevShowSideDrawer);
    }


    return (
        <React.Fragment>
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                onClickDrawerToggle={sideDrawerToggleClickHandler} />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                visible={showSideDrawer}
                onClose={hideSideDrawerHandler} />
            <div>SideDrawer, Backdrop</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
