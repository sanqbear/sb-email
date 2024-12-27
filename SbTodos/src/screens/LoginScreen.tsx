import React from 'react';
import {StyleSheet, View} from 'react-native';
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
      <View style={styles.content}>
        <Login onLogin={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#335847',
  },
  content: {
    flex: 1,
    marginTop: '70%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
