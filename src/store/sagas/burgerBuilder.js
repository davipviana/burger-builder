import axiosInstance from '../../axiosInstance';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* initIngredientsSaga() {
  try {
    const response = yield axiosInstance.get('/ingredients.json')
    yield put(actions.fetchIngredientsSuccess(response.data));
  } catch {
    yield put(actions.fetchIngredientsFail());
  }
}
