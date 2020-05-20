import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const Burger = ({ ingredients }) => {
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {getBurgerIngredients(ingredients)}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

const getBurgerIngredients = (ingredients) => {
    const ingredientsTypes = Object.keys(ingredients);

    const burgerIngredients = ingredientsTypes.map(ingredientType => {
        const ingredientCount = ingredients[ingredientType];

        return [...Array(ingredientCount)].map((_, index) => (
            <BurgerIngredient key={ingredientType + index} type={ingredientType} />
        ))
    });

    return burgerIngredients;
}

export default Burger;