import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state) => {
  return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
}

const purchaseBurgerSucceed = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId
  };

  return {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  };
}

const purchaseBurgerFail = (state) => {
  return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state) => {
  return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { loading: false, orders: action.orders });
}

const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCEED: return purchaseBurgerSucceed(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
    default: return state;
  }
};

export default reducer;