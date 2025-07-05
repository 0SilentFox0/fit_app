import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../components/Input';

describe('Input Component', () => {
  it('renders correctly with label', () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Input
        label="Email"
        placeholder="Enter email"
        value=""
        onChangeText={onChangeText}
      />
    );

    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter email"
        value=""
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Enter email');
    fireEvent.changeText(input, 'test@example.com');
    expect(onChangeText).toHaveBeenCalledWith('test@example.com');
  });

  it('shows error message when error prop is provided', () => {
    const onChangeText = jest.fn();
    const { getByText } = render(
      <Input
        placeholder="Enter email"
        value=""
        onChangeText={onChangeText}
        error="Email is required"
      />
    );

    expect(getByText('Email is required')).toBeTruthy();
  });

  it('renders with secure text entry', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter password"
        value=""
        onChangeText={onChangeText}
        secureTextEntry={true}
      />
    );

    const input = getByPlaceholderText('Enter password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('renders with different keyboard types', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText, rerender } = render(
      <Input
        placeholder="Enter email"
        value=""
        onChangeText={onChangeText}
        keyboardType="email-address"
      />
    );

    let input = getByPlaceholderText('Enter email');
    expect(input.props.keyboardType).toBe('email-address');

    rerender(
      <Input
        placeholder="Enter number"
        value=""
        onChangeText={onChangeText}
        keyboardType="numeric"
      />
    );

    input = getByPlaceholderText('Enter number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  it('is disabled when disabled prop is true', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={onChangeText}
        disabled={true}
      />
    );

    const input = getByPlaceholderText('Enter text');
    expect(input.props.editable).toBe(false);
  });

  it('handles focus and blur events', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <Input
        placeholder="Enter text"
        value=""
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Enter text');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');
    
    // The component should handle these events without crashing
    expect(input).toBeTruthy();
  });
}); 