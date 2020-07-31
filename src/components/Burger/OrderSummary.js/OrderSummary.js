import React from "react";

import { useTranslation } from "react-i18next";

import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const { t } = useTranslation();
  const ingredientsTypes = Object.keys(props.ingredients);
  const ingredientSummary = ingredientsTypes.map((ingredientType) => {
    const ingredientCount = props.ingredients[ingredientType];
    return (
      <li key={ingredientType}>
        <span style={{ textTransform: "capitalize" }}>{t(ingredientType)}</span>
        : {ingredientCount}
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3>{t("yourOrder")}</h3>
      <p>{t("messages.orderDescription")}:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>
          {t("totalPrice")}: {props.price}
        </strong>
      </p>
      <p>{t("messages.continueOrder")}</p>
      <Button type="Danger" onClick={props.onCancel}>
        {t("cancel").toUpperCase()}
      </Button>
      <Button type="Success" onClick={props.onContinue}>
        {t("continue").toUpperCase()}
      </Button>
    </React.Fragment>
  );
};

export default OrderSummary;
