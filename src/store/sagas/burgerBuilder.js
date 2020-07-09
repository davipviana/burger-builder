import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* initIngredientsSaga(_) {
  try {
    const response = yield axios.get('/ingredients.json')
    yield put(actions.fetchIngredientsSuccess(response.data));
  } catch (_) {
    yield put(actions.fetchIngredientsFail());
  }
}