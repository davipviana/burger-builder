import * as actionTypes from './actionTypes';

export const authInit = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_INIT,
    email: email,
    password: password,
    isSignup: isSignup
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucceed = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCEED,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutInit = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_INIT
  };
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_SUCCEED
  };
}

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
}