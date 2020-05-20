import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const Burger = (props) => {
    const burgerIngredients = getBurgerIngredients(props.ingredients);
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {
                (burgerIngredients.length === 0)
                    ? getNoIngredientsMessage()
                    : burgerIngredients
            }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

const getBurgerIngredients = (ingredients) => {
    const ingredientsTypes = Object.keys(ingredients);

    const burgerIngredients = ingredientsTypes
        .map(ingredientType => {
            const ingredientCount = ingredients[ingredientType];
            return getBurgerIngredientsOfType(ingredientType, ingredientCount);
        })
        .reduce((arr, el) => arr.concat(el), []);
    return burgerIngredients;
}

const getBurgerIngredientsOfType = (ingredientType, amount) => {
    return [...Array(amount)].map((_, index) => (
        <BurgerIngredient key={ingredientType + index} type={ingredientType} />
    ))
}

const getNoIngredientsMessage = () => (<p>Please start adding Ingredients!</p>);

export default Burger;