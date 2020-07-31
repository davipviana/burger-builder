import React from "react";

import { useTranslation } from "react-i18next";

import styles from "./BuildControl.module.css";

const BuildControl = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button
        className={styles.Less}
        onClick={props.onRemoveIngredient}
        disabled={props.disabled}
      >
        {t("less")}
      </button>
      <button className={styles.More} onClick={props.onAddIngredient}>
        {t("more")}
      </button>
    </div>
  );
};

export default BuildControl;
