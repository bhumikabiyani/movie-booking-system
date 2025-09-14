import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

interface AccessibleButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  accessibilityLabel,
  accessibilityHint,
  style,
  textStyle,
  children,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.baseButton,
      ...styles[`${size}Button`],
      ...styles[`${variant}Button`],
    };

    if (disabled) {
      return { ...baseStyle, ...styles.disabledButton };
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      ...styles.baseText,
      ...styles[`${size}Text`],
      ...styles[`${variant}Text`],
    };

    if (disabled) {
      return { ...baseTextStyle, ...styles.disabledText };
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      activeOpacity={disabled ? 1 : 0.8}
    >
      {children || <Text style={[getTextStyle(), textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
    ...Shadows.md,
  },
  
  // Size variants
  smallButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 36, // Minimum touch target
  },
  mediumButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 44, // Recommended touch target
  },
  largeButton: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 48,
  },
  
  // Style variants
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  
  disabledButton: {
    backgroundColor: Colors.seatDisabled,
    opacity: 0.6,
    ...Shadows.none,
  },
  
  // Text styles
  baseText: {
    fontFamily: Typography.fontFamily,
    fontWeight: Typography.fontWeight.semibold,
    textAlign: 'center',
  },
  
  smallText: {
    fontSize: Typography.fontSize.sm,
  },
  mediumText: {
    fontSize: Typography.fontSize.base,
  },
  largeText: {
    fontSize: Typography.fontSize.lg,
  },
  
  primaryText: {
    color: Colors.textOnPrimary,
  },
  secondaryText: {
    color: Colors.textPrimary,
  },
  outlineText: {
    color: Colors.primary,
  },
  
  disabledText: {
    color: Colors.textLight,
  },
});

export default AccessibleButton;