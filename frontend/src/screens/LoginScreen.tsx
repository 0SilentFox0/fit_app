import React, { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useTheme } from '../ThemeProvider';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLogin,
  onSignup,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const theme = useTheme();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onLogin(email, password);
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1, padding: theme.spacing.xl, justifyContent: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center', marginBottom: theme.spacing.xs }}>
          Welcome to FitConnect
        </Text>
        <Text style={{ fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.spacing.xl }}>
          Sign in to your account
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <Button
          title={isLoading ? 'Signing In...' : 'Sign In'}
          onPress={handleLogin}
          disabled={isLoading}
          style={{ marginTop: theme.spacing.md }}
        />

        <Button
          title="Forgot Password?"
          onPress={onForgotPassword}
          variant="outline"
          size="small"
          style={{ marginTop: theme.spacing.md }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.xl }}>
          <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>Don't have an account? </Text>
          <Button
            title="Sign Up"
            onPress={onSignup}
            variant="outline"
            size="small"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}; 