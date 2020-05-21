import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        },
        totalPrice: 5
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;

        const newCount = oldCount - 1;

        const newIngredients = { ...this.state.ingredients };
        newIngredients[type] = newCount;

        const oldPrice = this.state.totalPrice;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceSubtraction;

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <Wrapper>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAddIngredient={this.addIngredientHandler}
                    onRemoveIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />
            </Wrapper>
        );
    };
}

export default BurgerBuilder;