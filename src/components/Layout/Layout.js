import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

const Layout = (props) => (
    <Wrapper>
        <Toolbar />
        <SideDrawer />
        <div>SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Wrapper>
);

export default Layout;