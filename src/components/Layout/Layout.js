import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import styles from './Layout.module.css';

const Layout = (props) => (
    <Wrapper>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Wrapper>
);

export default Layout;