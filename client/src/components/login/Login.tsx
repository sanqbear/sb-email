import React from 'react';
import { View, TextInput, Button, Text, ActivityIndicator } from 'react-native';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, isLoading, error }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = () => {
    onLogin(username, password);
  };

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
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleSubmit} />
      )}
    </View>
  );
};

export default Login;
