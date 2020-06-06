import React from 'react';

import styles from './Order.module.css';

const Order = (props) => {
    const ingredients = [];
    for (let ingredientKey in props.ingredients) {
        ingredients.push({
            name: ingredientKey,
            amount: props.ingredients[ingredientKey]
        });
    }
    const ingredientsOutput = ingredients.map(ingredient => (
        <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    ));
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;