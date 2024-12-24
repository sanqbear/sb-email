import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoginState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  token: string | null;
  user: {
    id?: string;
    email?: string;
  } | null;
}

const initialState: LoginState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: null,
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (
      state,
      _action: PayloadAction<{email: string; password: string}>,
    ) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{token: string; user: LoginState['user']}>,
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: _state => {
      return initialState;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure, logout} =
  loginSlice.actions;
export default loginSlice.reducer;
