import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../ThemeProvider';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const theme = useTheme();
  const baseButtonStyle = styles.button;
  const buttonStyle = [
    baseButtonStyle,
    {
      borderRadius: theme.borderRadius,
      backgroundColor:
        variant === 'primary'
          ? theme.colors.primary
          : variant === 'secondary'
          ? theme.colors.secondary
          : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? theme.colors.primary : 'transparent',
      opacity: disabled ? 0.5 : 1,
      paddingVertical:
        size === 'small' ? theme.spacing.xs : size === 'large' ? theme.spacing.lg : theme.spacing.md,
      paddingHorizontal:
        size === 'small' ? theme.spacing.md : size === 'large' ? theme.spacing.xl : theme.spacing.lg,
      alignItems: 'center' as ViewStyle['alignItems'],
      justifyContent: 'center' as ViewStyle['justifyContent'],
    },
    style,
  ];

  const textStyleCombined = [
    {
      fontWeight: '600' as TextStyle['fontWeight'],
      color:
        variant === 'primary' || variant === 'secondary'
          ? theme.colors.text
          : theme.colors.primary,
      fontSize:
        size === 'small' ? 14 : size === 'large' ? 18 : 16,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyleCombined}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 