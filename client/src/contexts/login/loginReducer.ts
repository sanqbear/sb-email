import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum LoginStatus {
  LOGIN_READY = 'LOGIN_READY',
  LOGIN_PROCESSING = 'LOGIN_PROCESSING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
}

interface LoginState {
  loginStatus: LoginStatus;
  error?: string;
  username?: string;
  password?: string;
  rememberMe?: boolean;
  token?: string;
}

const initialState: LoginState = {
  loginStatus: LoginStatus.LOGIN_READY,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (
      state,
      action: PayloadAction<{
        username: string;
        password: string;
        rememberMe: boolean;
      }>,
    ) => {
      state.loginStatus = LoginStatus.LOGIN_PROCESSING;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.rememberMe = action.payload.rememberMe;
    },
    loginSuccess: (state, action: PayloadAction<{token: string}>) => {
      state.loginStatus = LoginStatus.LOGIN_SUCCESS;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loginStatus = LoginStatus.LOGIN_FAILURE;
      state.error = action.payload;
      state.username = undefined;
      state.password = undefined;
      state.token = undefined;
    },
    clearError: state => {
      state.error = undefined;
      state.username = undefined;
      state.password = undefined;
      state.token = undefined;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, clearError} =
  loginSlice.actions;
export default loginSlice.reducer;
