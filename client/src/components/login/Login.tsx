import React from 'react';
import {View, TextInput, Button, Text, ActivityIndicator} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

interface LoginProps {
  onLogin: (username: string, password: string, rememberMe: boolean) => void;
  isLoading: boolean;
  error?: string;
}

const Login: React.FC<LoginProps> = ({onLogin, isLoading, error}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const {getItem} = useAsyncStorage(
    `${Config.APP_STORAGE_KEY || ''}:rememberMe`,
  );

  const handleSubmit = () => {
    onLogin(username, password, rememberMe);
  };

  React.useEffect(() => {
    getItem().then(value => {
      const rm = value === 'true';
      setRememberMe(rm);
      if (rm) {
        Keychain.getGenericPassword().then(credentials => {
          if (credentials) {
            setUsername(credentials.username);
            setPassword(credentials.password);
          }
        });
      }
    });
  }, [getItem, onLogin]);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        editable={!isLoading}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={() => {
          setRememberMe(!rememberMe);
        }}
      />
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleSubmit} />
      )}
    </View>
  );
};

export default Login;
