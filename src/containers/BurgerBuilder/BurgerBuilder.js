import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true })
        //     });
    }

    isPurchasable(ingredients) {
        const ingredientsTypes = Object.keys(ingredients);
        const ingredientsAmount = ingredientsTypes
            .map(ingredientType => ingredients[ingredientType])
            .reduce((sum, el) => sum = sum + el, 0);

        return ingredientsAmount > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    getOrderSummary = () => (
        <OrderSummary
            ingredients={this.props.ingredients}
            onCancel={this.purchaseCancelHandler}
            onContinue={this.purchaseContinueHandler}
            price={this.props.totalPrice} />
    );

    getBurger = () => {
        const disabledInfo = { ...this.props.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <React.Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    onAddIngredient={this.props.addIngredient}
                    onRemoveIngredient={this.props.removeIngredient}
                    onOrder={this.purchaseHandler}
                    disabled={disabledInfo}
                    price={this.props.totalPrice}
                    purchasable={this.isPurchasable(this.props.ingredients)} />
            </React.Fragment>
        );
    };

    render() {
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
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


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName }),
        removeIngredient: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));