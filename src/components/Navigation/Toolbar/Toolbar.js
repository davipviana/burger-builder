import React from "react";

import Logo from "../../Logo/Logo";
import LocaleSelector from "../../LocaleSelector/LocaleSelector";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

import styles from "./Toolbar.module.css";

const Toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle onClick={props.onClickDrawerToggle} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <div className={styles.NavigationContainer}>
      <LocaleSelector />
      <nav className={styles.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </nav>
    </div>
  </header>
);

export default Toolbar;
