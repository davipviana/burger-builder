import React from "react";
import { useTranslation } from "react-i18next";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import styles from "./Burger.module.css";

const Burger = (props) => {
  const { t } = useTranslation();
  const burgerIngredients = getBurgerIngredients(props.ingredients);
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients.length === 0 ? (
        <p>{t("messages.addIngredients")}</p>
      ) : (
        burgerIngredients
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

const getBurgerIngredients = (ingredients) => {
  const ingredientsTypes = Object.keys(ingredients);

  return ingredientsTypes
    .map((ingredientType) => {
      const ingredientCount = ingredients[ingredientType];
      return getBurgerIngredientsOfType(ingredientType, ingredientCount);
    })
    .reduce((arr, el) => arr.concat(el), []);
};

const getBurgerIngredientsOfType = (ingredientType, amount) => {
  return [...Array(amount)].map((_, index) => (
    <BurgerIngredient key={ingredientType + index} type={ingredientType} />
  ));
};

export default Burger;
