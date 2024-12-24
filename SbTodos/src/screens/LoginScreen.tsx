import React from 'react';
import {StyleSheet} from 'react-native';
import Login from '@/components/login/Login';
import {useAppDispatch} from '@/hooks';
import {loginRequest} from '@/contexts/login/loginReducer';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const handleLogin = (email: string, password: string) => {
    dispatch(loginRequest({email, password}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <Login onLogin={handleLogin} />
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
});

export default LoginScreen;
