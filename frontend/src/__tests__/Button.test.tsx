import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../components/Button';

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={onPress} />
    );

    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const onPress = jest.fn();
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={onPress} variant="primary" />
    );

    expect(getByText('Primary')).toBeTruthy();

    rerender(
      <Button title="Secondary" onPress={onPress} variant="secondary" />
    );
    expect(getByText('Secondary')).toBeTruthy();

    rerender(
      <Button title="Outline" onPress={onPress} variant="outline" />
    );
    expect(getByText('Outline')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const onPress = jest.fn();
    const { getByText, rerender } = render(
      <Button title="Small" onPress={onPress} size="small" />
    );

    expect(getByText('Small')).toBeTruthy();

    rerender(
      <Button title="Medium" onPress={onPress} size="medium" />
    );
    expect(getByText('Medium')).toBeTruthy();

    rerender(
      <Button title="Large" onPress={onPress} size="large" />
    );
    expect(getByText('Large')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Disabled Button" onPress={onPress} disabled={true} />
    );

    const button = getByText('Disabled Button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading state when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Loading..." onPress={onPress} disabled={true} />
    );

    expect(getByText('Loading...')).toBeTruthy();
  });
}); 