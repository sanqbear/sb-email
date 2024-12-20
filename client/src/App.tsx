import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from './hooks';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import {LoginStatus} from './contexts/login/loginReducer';

const App = () => {
  const Stack = createNativeStackNavigator();
  const loginStatus = useAppSelector(state => state.login.loginStatus);

  return (
    <NavigationContainer>
      {loginStatus === LoginStatus.LOGIN_SUCCESS ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
