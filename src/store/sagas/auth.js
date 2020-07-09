import axios from 'axios';
import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions';


const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

export function* logoutSaga(_) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logoutInit());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

  if (!action.isSignup) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  }

  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(_) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logoutInit());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.logoutInit());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));

      const expirationTime = yield (expirationDate.getTime() - new Date().getTime()) / 1000;
      yield put(actions.checkAuthTimeout(expirationTime));
    }
  }
}