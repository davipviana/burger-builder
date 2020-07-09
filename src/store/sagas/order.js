import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post('/orders.json?auth=' + action.token, action.order);
    yield put(actions.purchaseBurgerSucceed(response.data.name, action.order));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  const response = yield axios.get('orders.json' + queryParams);
  try {
    const orders = [];
    for (let key in response.data) {
      orders.push({
        ...response.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}