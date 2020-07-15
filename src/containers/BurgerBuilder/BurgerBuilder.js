import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

const BurgerBuilder = (props) => {
    const { initIngredients } = props;
    const [purchasing, setPurchasing] = useState(false);
    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const isPurchasable = (ingredients) => {
        const ingredientsTypes = Object.keys(ingredients);
        const ingredientsAmount = ingredientsTypes
            .map(ingredientType => ingredients[ingredientType])
            .reduce((sum, el) => sum = sum + el, 0);

        return ingredientsAmount > 0;
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.setAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.initPurchase();
        props.history.push('/checkout');
    }

    const getOrderSummary = () => (
        <OrderSummary
            ingredients={props.ingredients}
            onCancel={purchaseCancelHandler}
            onContinue={purchaseContinueHandler}
            price={props.totalPrice} />
    );

    const getBurger = () => {
        const disabledInfo = { ...props.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <React.Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    onAddIngredient={props.addIngredient}
                    onRemoveIngredient={props.removeIngredient}
                    onOrder={purchaseHandler}
                    disabled={disabledInfo}
                    price={props.totalPrice}
                    purchasable={isPurchasable(props.ingredients)}
                    isAuthenticated={props.isAuthenticated} />
            </React.Fragment>
        );
    };

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (props.ingredients) {
        burger = getBurger();
        orderSummary = getOrderSummary();
    }

    return (
        <React.Fragment>
            <Modal visible={purchasing} onModalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
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
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.initPurchase()),
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));