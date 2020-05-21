import React from 'react';

import Wrapper from '../../../hoc/Wrapper';

const OrderSummary = (props) => {
    const ingredientsTypes = Object.keys(props.ingredients);
    const ingredientSummary = ingredientsTypes
        .map(ingredientType => {
            const ingredientCount = props.ingredients[ingredientType];
            return (
                <li key={ingredientType}>
                    <span style={{ textTransform: 'capitalize' }}>{ingredientType}</span>: {ingredientCount}
                </li>
            );
        });

    return (
        <Wrapper>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Wrapper>
    );
};

export default OrderSummary;