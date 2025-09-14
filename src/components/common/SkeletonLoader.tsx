import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = wp('30%'),
  height = hp('15%'),
  borderRadius = BorderRadius.lg,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.surfaceVariant, Colors.border],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

// Movie Card Skeleton
export const MovieCardSkeleton: React.FC = () => (
  <View style={styles.movieCardContainer}>
    <SkeletonLoader width={wp('28%')} height={hp('15%')} />
    <SkeletonLoader width={wp('20%')} height={hp('2%')} style={{ marginTop: Spacing.sm }} />
    <SkeletonLoader width={wp('15%')} height={hp('1.5%')} style={{ marginTop: Spacing.xs }} />
  </View>
);

// Seat Skeleton
export const SeatSkeleton: React.FC = () => (
  <SkeletonLoader 
    width={wp('6%')} 
    height={wp('6%')} 
    borderRadius={BorderRadius.md}
    style={{ margin: wp('1.11%') }}
  />
);

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
  movieCardContainer: {
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: Spacing.sm,
  },
});

export default SkeletonLoader;