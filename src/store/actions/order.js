import * as actionTypes from './actionTypes';

export const purchaseBurgerSucceed = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCEED,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
}

export const purchaseBurgerInit = (order, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
    order: order,
    token: token
  };
};

export const initPurchase = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
}

export const fetchOrdersInit = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
    token: token,
    userId: userId
  };
}