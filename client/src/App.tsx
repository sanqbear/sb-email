import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  const [login, setLogin] = useState(false);
  return (
    <NavigationContainer>
      {login ? <HomeScreen /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default App;
