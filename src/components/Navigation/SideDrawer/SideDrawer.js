import React from 'react';

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Wrapper from '../../../hoc/Wrapper';

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {

    return (
        <Wrapper>
            <Backdrop visible />
            <div className={styles.SideDrawer}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    );
};

export default SideDrawer;