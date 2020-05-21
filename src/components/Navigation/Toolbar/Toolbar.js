import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

import styles from './Toolbar.module.css'

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div>MENU</div>
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;