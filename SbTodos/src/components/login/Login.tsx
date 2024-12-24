import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login = ({onLogin}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [username, setUsername] = useState('');
  const [domain, setDomain] = useState('');

  const handleLogin = () => {
    onLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.showMoreContainer}>
        <TouchableOpacity onPress={() => setShowMore(!showMore)}>
          <Text>{showMore ? 'Hide' : 'More Information'}</Text>
        </TouchableOpacity>
        {showMore && (
          <View style={styles.showMoreContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Domain"
              value={domain}
              onChangeText={setDomain}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 16,
  },
  showMoreContainer: {
    marginTop: 8,
  },
});

export default Login;
