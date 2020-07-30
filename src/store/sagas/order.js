import { put } from 'redux-saga/effects';
import axiosInstance from '../../axiosInstance';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axiosInstance.post('/orders.json?auth=' + action.token, action.order);
    yield put(actions.purchaseBurgerSuccess(response.data.name, action.order));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
  const response = yield axiosInstance.get('orders.json' + queryParams);
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