import React from "react";

import { useTranslation } from "react-i18next";

import NavigationItem from "./NavigationItem/NavigationItem";

import styles from "./NavigationItems.module.css";

const NavigationItems = (props) => {
  const { t } = useTranslation();
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">{t("orders")}</NavigationItem>
      ) : null}
      {props.isAuthenticated ? (
        <NavigationItem link="/logout">{t("logout")}</NavigationItem>
      ) : (
        <NavigationItem link="/auth">{t("authenticate")}</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
