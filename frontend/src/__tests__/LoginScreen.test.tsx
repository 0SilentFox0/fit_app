import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../screens/LoginScreen';

describe('LoginScreen Component', () => {
  const mockOnLogin = jest.fn();
  const mockOnSignup = jest.fn();
  const mockOnForgotPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all elements', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    expect(getByText('Welcome to FitConnect')).toBeTruthy();
    expect(getByText('Sign in to your account')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
    expect(getByText('Forgot Password?')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('shows validation error for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('shows validation error for short password', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters')).toBeTruthy();
    });

    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('calls onLogin with valid credentials', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const signInButton = getByText('Sign In');
    fireEvent.press(signInButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('calls onSignup when sign up button is pressed', () => {
    const { getByText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const signUpButton = getByText('Sign Up');
    fireEvent.press(signUpButton);

    expect(mockOnSignup).toHaveBeenCalledTimes(1);
  });

  it('calls onForgotPassword when forgot password button is pressed', () => {
    const { getByText } = render(
      <LoginScreen
        onLogin={mockOnLogin}
        onSignup={mockOnSignup}
        onForgotPassword={mockOnForgotPassword}
      />
    );

    const forgotPasswordButton = getByText('Forgot Password?');
    fireEvent.press(forgotPasswordButton);

    expect(mockOnForgotPassword).toHaveBeenCalledTimes(1);
  });
}); 