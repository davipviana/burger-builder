import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

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

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    getOrderSummary = () => (
        <OrderSummary
            ingredients={this.state.ingredients}
            onCancel={this.purchaseCancelHandler}
            onContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
    );

    getBurger = () => {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    onAddIngredient={this.addIngredientHandler}
                    onRemoveIngredient={this.removeIngredientHandler}
                    onOrder={this.purchaseHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable} />
            </React.Fragment>
        );
    };

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = this.getBurger();
            orderSummary = this.getOrderSummary();
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <React.Fragment>
                <Modal visible={this.state.purchasing} onModalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);