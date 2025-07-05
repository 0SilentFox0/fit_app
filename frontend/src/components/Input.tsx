import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  disabled = false,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  return (
    <View style={[{ marginBottom: theme.spacing.md }, style]}>
      {label && <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text, marginBottom: theme.spacing.xs }}>{label}</Text>}
      <TextInput
        style={[
          {
            borderWidth: 1,
            borderColor: error
              ? theme.colors.error
              : isFocused
              ? theme.colors.primary
              : theme.colors.inputBorder,
            borderRadius: theme.borderRadius,
            paddingHorizontal: theme.spacing.lg,
            paddingVertical: theme.spacing.md,
            fontSize: 16,
            backgroundColor: theme.colors.inputBackground,
            color: theme.colors.text,
          },
          disabled && { backgroundColor: theme.colors.muted, color: theme.colors.textSecondary },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={{ color: theme.colors.error, fontSize: 14, marginTop: 4 }}>{error}</Text>}
    </View>
  );
}; 