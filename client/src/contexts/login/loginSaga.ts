import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {loginSuccess, loginRequest, loginFailure} from './loginReducer';

// This should be replaced with your actual login API call
async function loginApi(username: string, password: string) {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'test' && password === 'test') {
        resolve({token: 'fake-token'});
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

function* handleLogin(
  action: PayloadAction<{username: string; password: string}>,
) {
  try {
    const {username, password} = action.payload;
    const result: {token: string} = yield call(loginApi, username, password);
    yield put(loginSuccess({token: result.token}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure('An unknown error occurred'));
    }
  }
}

export function* loginSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
