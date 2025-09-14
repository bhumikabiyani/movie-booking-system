import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Color Palette
export const Colors = {
  // Primary Colors
  primary: '#6A1B9A',
  primaryDark: '#4A148C',
  primaryLight: '#9C4DCC',
  secondary: '#832DA4',
  accent: '#E1BEE7',
  
  // Background Colors
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceVariant: '#F5F5F5',
  
  // Text Colors
  textPrimary: '#14171A',
  textSecondary: '#706E6B',
  textTertiary: '#3C444D',
  textLight: '#9E9E9E',
  textOnPrimary: '#FFFFFF',
  
  // Status Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Seat Colors
  seatAvailable: '#F2F2F2',
  seatSelected: '#6A1B9A',
  seatBooked: '#E0E0E0',
  seatDisabled: '#BDBDBD',
  
  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  borderDark: '#CCCCCC',
  
  // Shadow Colors
  shadow: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
};

// Typography
export const Typography = {
  // Font Family
  fontFamily: 'notoSans',
  
  // Font Sizes
  fontSize: {
    xs: wp('2.5%'),
    sm: wp('3%'),
    base: wp('3.5%'),
    lg: wp('4%'),
    xl: wp('4.5%'),
    '2xl': wp('5%'),
    '3xl': wp('5.5%'),
    '4xl': wp('6%'),
  },
  
  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  
  // Line Heights
  lineHeight: {
    tight: hp('1.5%'),
    normal: hp('2%'),
    relaxed: hp('2.5%'),
    loose: hp('3%'),
  },
};

// Spacing
export const Spacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('3%'),
  lg: wp('4%'),
  xl: wp('5%'),
  '2xl': wp('6%'),
  '3xl': wp('8%'),
  '4xl': wp('10%'),
};

// Border Radius
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
};

// Animation Durations
export const Animation = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
};

// Common Styles
export const CommonStyles = {
  // Flex utilities
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' as const },
  flexColumn: { flexDirection: 'column' as const },
  justifyCenter: { justifyContent: 'center' as const },
  justifyBetween: { justifyContent: 'space-between' as const },
  justifyAround: { justifyContent: 'space-around' as const },
  alignCenter: { alignItems: 'center' as const },
  alignStart: { alignItems: 'flex-start' as const },
  alignEnd: { alignItems: 'flex-end' as const },
  
  // Text utilities
  textCenter: { textAlign: 'center' as const },
  textLeft: { textAlign: 'left' as const },
  textRight: { textAlign: 'right' as const },
  
  // Common containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  card: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.md,
  },
  
  button: {
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  Animation,
  CommonStyles,
};