import React from 'react';
import {View} from 'react-native';
import Login from '../components/login/Login';
import {useAppDispatch, useAppSelector} from '../hooks';
import {loginRequest} from '../contexts/login/loginReducer';
import {LoginStatus} from '@/contexts/login/loginReducer';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(state => state.login.loginStatus);
  const error = useAppSelector(state => state.login.error);

  const handleLogin = async (_username: string, _password: string) => {
    dispatch(loginRequest({username: _username, password: _password}));
  };

  return (
    <View>
      <Login
        onLogin={handleLogin}
        isLoading={loginStatus === LoginStatus.LOGIN_PROCESSING}
        error={error}
      />
    </View>
  );
};

export default LoginScreen;
