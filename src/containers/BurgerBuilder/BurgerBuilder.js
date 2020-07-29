import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios-orders';

import Modal from '../../components/UI/Modal/Modal';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary.js/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const addIngredient = (ingredientName) => dispatch(actions.addIngredient(ingredientName));
    const removeIngredient = (ingredientName) => dispatch(actions.removeIngredient(ingredientName));
    const initIngredients = useCallback(() => dispatch(actions.fetchIngredientsStart()), [dispatch]);
    const initPurchase = () => dispatch(actions.initPurchase());
    const setAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

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
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            setAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        initPurchase();
        props.history.push('/checkout');
    }

    const getOrderSummary = () => (
        <OrderSummary
            ingredients={ingredients}
            onCancel={purchaseCancelHandler}
            onContinue={purchaseContinueHandler}
            price={totalPrice} />
    );

    const getBurger = () => {
        const disabledInfo = { ...ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return (
            <React.Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    onAddIngredient={addIngredient}
                    onRemoveIngredient={removeIngredient}
                    onOrder={purchaseHandler}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchasable={isPurchasable(ingredients)}
                    isAuthenticated={isAuthenticated} />
            </React.Fragment>
        );
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (ingredients) {
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

export default withErrorHandler(BurgerBuilder, axios);