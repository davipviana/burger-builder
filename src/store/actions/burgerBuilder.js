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

export const fetchIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    };
}

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    };
}