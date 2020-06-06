import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {
    let sideDrawerClasses = [styles.SideDrawer, styles.Closed];

    if (props.visible) {
        sideDrawerClasses = [styles.SideDrawer, styles.Open];
    }

    return (
        <React.Fragment>
            <Backdrop visible={props.visible} onClick={props.onClose} />
            <div className={sideDrawerClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default SideDrawer;