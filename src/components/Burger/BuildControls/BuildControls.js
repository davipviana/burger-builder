import React from "react";

import { useTranslation } from "react-i18next";

import BuildControl from "./BuildControl/BuildControl";
import styles from "./BuildControls.module.css";

const controls = [
  { labelLanguageKey: "salad", type: "salad" },
  { labelLanguageKey: "bacon", type: "bacon" },
  { labelLanguageKey: "cheese", type: "cheese" },
  { labelLanguageKey: "meat", type: "meat" },
];

const BuildControls = (props) => {
  const { t } = useTranslation();
  return (
    <div className={styles.BuildControls}>
      <p>
        {t("currentPrice")}: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={t(ctrl.labelLanguageKey)}
          onAddIngredient={() => props.onAddIngredient(ctrl.type)}
          onRemoveIngredient={() => props.onRemoveIngredient(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.onOrder}
      >
        {props.isAuthenticated
          ? t("orderNow").toUpperCase()
          : t("signUpToOrder").toUpperCase()}
      </button>
    </div>
  );
};

export default BuildControls;
