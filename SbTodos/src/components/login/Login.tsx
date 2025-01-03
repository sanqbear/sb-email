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
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface LoginProps {
  onLogin: (
    email: string,
    password: string,
    username: string,
    domain?: string,
  ) => void;
}

const Login = ({onLogin}: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [domain, setDomain] = useState('');
  const [showMore, setShowMore] = useState(false);
  const loginState = useAppSelector(state => state.login);
  const {t} = useTranslation();

  const showMoreHeight = useSharedValue(0);

  const handleLogin = () => {
    onLogin(email, password, username, domain);
  };

  const handleChangeEmail = (text: string) => {
    if (username.trim() === '' || email === username) {
      setDomain('');
      setUsername(text);
    }
    setEmail(text);
  };

  const handleShowMore = () => {
    showMoreHeight.value = showMore
      ? withTiming(0, {duration: 300})
      : withTiming(120, {duration: 300});
    setShowMore(!showMore);
  };

  const showMoreAnimatedStyle = useAnimatedStyle(
    () => ({
      height: showMoreHeight.value,
      opacity: showMoreHeight.value > 0 ? 1 : 0,
    }),
    [showMoreHeight],
  );

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
          onPress={handleShowMore}>
          <Text style={styles.showMoreButtonText}>
            {showMore ? t('hideMore') : t('showMore')}
          </Text>
        </TouchableOpacity>
        <Animated.View
          style={[styles.showMoreContainer, showMoreAnimatedStyle]}>
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
        </Animated.View>
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Login;
