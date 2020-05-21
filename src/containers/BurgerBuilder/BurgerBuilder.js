import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5,
        purchasable: false,
        purchasing: false
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
        this.updatePutchasableState(newIngredients);
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
        this.updatePutchasableState(newIngredients);
    }

    updatePutchasableState(ingredients) {
        const ingredientsTypes = Object.keys(ingredients);
        const ingredientsAmount = ingredientsTypes
            .map(ingredientType => ingredients[ingredientType])
            .reduce((sum, el) => sum = sum + el, 0);

        this.setState({ purchasable: ingredientsAmount > 0 });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <Wrapper>
                <Modal visible={this.state.purchasing} onModalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAddIngredient={this.addIngredientHandler}
                    onRemoveIngredient={this.removeIngredientHandler}
                    onOrder={this.purchaseHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </Wrapper>
        );
    };
}

export default BurgerBuilder;