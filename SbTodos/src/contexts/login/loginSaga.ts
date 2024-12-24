import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {loginRequest, loginSuccess, loginFailure} from './loginReducer';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

function* loginSaga(action: PayloadAction<{email: string; password: string}>) {
  try {
    // Replace this with your actual API call
    const response: LoginResponse = yield call(async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay

      return {
        token: 'simulated_token',
        user: {
          id: 'simulated_id',
          email: action.payload.email,
        },
      };
    });

    yield put(
      loginSuccess({
        token: response.token,
        user: response.user,
      }),
    );
  } catch (error) {
    yield put(
      loginFailure(error instanceof Error ? error.message : 'Login failed'),
    );
  }
}

export function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
