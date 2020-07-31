import React from "react";

import { useTranslation } from "react-i18next";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.CheckoutSummary}>
      <h1>{t("messages.tastesWell")}</h1>
      <div style={{ width: "100%", magin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" onClick={props.onCancel}>
        {t("cancel").toUpperCase()}
      </Button>
      <Button type="Success" onClick={props.onContinue}>
        {t("continue").toUpperCase()}
      </Button>
    </div>
  );
};

export default CheckoutSummary;
