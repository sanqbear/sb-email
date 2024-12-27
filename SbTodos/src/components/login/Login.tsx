import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/hooks';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import '@/i18n';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login = ({onLogin}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [username, setUsername] = useState('');
  const [domain, setDomain] = useState('');
  const loginState = useAppSelector(state => state.login);
  const {t} = useTranslation();

  const handleLogin = () => {
    onLogin(email, password);
  };

  const handleChangeEmail = (text: string) => {
    if (username.trim() === '' || email === username) {
      setDomain('');
      setUsername(text);
    }
    setEmail(text);
  };

  useEffect(() => {
    if (!loginState.isAuthenticated && loginState.error) {
      setShowMore(true);
    }
  }, [loginState.isAuthenticated, loginState.error]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={t('email')}
        value={email}
        onChangeText={handleChangeEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder={t('password')}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>{t('loginButton')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.showMoreButtonContainer}>
        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => setShowMore(!showMore)}>
          <Text style={styles.showMoreButtonText}>
            {showMore ? t('hideMore') : t('showMore')}
          </Text>
        </TouchableOpacity>
        {showMore && (
          <View style={styles.showMoreContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('username')}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              style={styles.input}
              placeholder={t('domain')}
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
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C4D40',
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    backgroundColor: '#2C4D40',
    padding: 16,
    borderRadius: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  showMoreButtonContainer: {
    marginTop: 18,
  },
  showMoreContainer: {
    marginTop: 18,
  },
  showMoreButton: {
    width: '100%',
  },
  showMoreButtonText: {
    color: '#2C4D40',
    textAlign: 'right',
  },
});

export default Login;
