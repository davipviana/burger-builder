import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import styles from './Layout.module.css';

const Layout = (props) => (
    <Wrapper>
        <Toolbar />
        <div>SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Wrapper>
);

export default Layout;