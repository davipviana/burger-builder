import React from 'react';

import Wrapper from '../../../hoc/Wrapper';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button type="Danger" onClick={props.onCancel}>CANCEL</Button>
            <Button type="Success" onClick={props.onContinue}>CONTINUE</Button>
        </Wrapper>
    );
};

export default OrderSummary;