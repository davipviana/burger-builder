import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    isPurchasable(ingredients) {
        const ingredientsTypes = Object.keys(ingredients);
        const ingredientsAmount = ingredientsTypes
            .map(ingredientType => ingredients[ingredientType])
            .reduce((sum, el) => sum = sum + el, 0);

        return ingredientsAmount > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.initPurchase();
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
                    purchasable={this.isPurchasable(this.props.ingredients)}
                    isAuthenticated={this.props.isAuthenticated} />
            </React.Fragment>
        );
    };

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ingredients) {
            burger = this.getBurger();
            orderSummary = this.getOrderSummary();
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(actions.fetchIngredientsStart()),
        initPurchase: () => dispatch(actions.initPurchase()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));