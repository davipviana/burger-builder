import React from "react";

import { useTranslation } from "react-i18next";

import styles from "./Order.module.css";

const Order = (props) => {
  const { t } = useTranslation();
  const ingredients = [];
  for (const ingredientKey in props.ingredients) {
    ingredients.push({
      name: ingredientKey,
      amount: props.ingredients[ingredientKey],
    });
  }
  const ingredientsOutput = ingredients.map((ingredient) => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
      key={ingredient.name}
    >
      {t(ingredient.name)} ({ingredient.amount})
    </span>
  ));
  return (
    <div className={styles.Order}>
      <p>
        {t("ingredients")}: {ingredientsOutput}
      </p>
      <p>
        {t("price")}:{" "}
        <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
