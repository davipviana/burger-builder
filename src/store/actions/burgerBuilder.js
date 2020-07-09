import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const fetchIngredientsSucceed = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCEED,
        ingredients: ingredients
    };
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
}

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    };
}