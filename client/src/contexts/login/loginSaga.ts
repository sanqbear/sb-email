import {PayloadAction} from '@reduxjs/toolkit';
import {call, put, takeLatest} from 'redux-saga/effects';
import {loginSuccess, loginRequest, loginFailure} from './loginReducer';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

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
  action: PayloadAction<{
    username: string;
    password: string;
    rememberMe: boolean;
  }>,
) {
  try {
    const {username, password, rememberMe} = action.payload;
    const result: {token: string} = yield call(loginApi, username, password);
    if (rememberMe) {
      yield call(Keychain.setGenericPassword, username, password);
      yield call(
        AsyncStorage.setItem,
        `${Config.APP_STORAGE_KEY || ''}:rememberMe`,
        'true',
      );
    } else {
      yield call(Keychain.resetGenericPassword);
      yield call(
        AsyncStorage.removeItem,
        `${Config.APP_STORAGE_KEY || ''}:rememberMe`,
      );
    }
    yield put(loginSuccess({token: result.token}));
  } catch (error) {
    yield call(Keychain.resetGenericPassword);
    yield call(
      AsyncStorage.removeItem,
      `${Config.APP_STORAGE_KEY || ''}:rememberMe`,
    );
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
