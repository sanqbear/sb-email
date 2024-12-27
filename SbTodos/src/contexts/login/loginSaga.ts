import {call, put, takeLatest} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {loginRequest, loginSuccess, loginFailure} from './loginReducer';
import loginAsync, {LoginResponse} from './loginApi';

function* loginSaga(
  action: PayloadAction<{
    email: string;
    password: string;
    username: string;
    domain?: string;
  }>,
) {
  try {
    // Replace this with your actual API call
    const response: LoginResponse = yield call(async () => {
      try {
        await loginAsync(
          action.payload.email,
          action.payload.password,
          action.payload.username,
          action.payload.domain,
        );
      } catch (e) {
        console.log(e);
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call delay

      return {
        token: 'simulated_token',
        user: {
          id: 'simulated_id',
          email: action.payload.email,
        },
      };
    });

    // yield put(
    //   loginSuccess({
    //     token: response.token,
    //     user: response.user,
    //   }),
    // );
  } catch (error) {
    yield put(
      loginFailure(error instanceof Error ? error.message : 'Login failed'),
    );
  }
}

export function* watchLoginSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
