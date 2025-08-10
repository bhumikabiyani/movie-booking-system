import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, PixelRatio } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Helper function for iOS-specific scaling
const normalize = (size: number) => {
  const scale = PixelRatio.getFontScale();
  return Platform.OS === 'ios' 
    ? Math.round(PixelRatio.roundToNearestPixel(size * scale))
    : size;
};

const Styles = () => StyleSheet.create({
  container: {
    flexDirection: "row", 
    paddingHorizontal: Platform.OS === 'ios' ? hp("2.5%") : hp("2.25%"),
    gap: Platform.OS === 'ios' ? 12 : 10,
    marginVertical: Platform.OS === 'ios' ? 5 : 0,
  },
  title: {
    fontSize: normalize(hp("1.3%")),
    fontWeight: Platform.OS === 'ios' ? "500" : "400",
    fontFamily: Platform.OS === 'ios' ? "System" : "notoSans", // iOS uses System font
    borderWidth: Platform.OS === 'ios' ? 1 : 1.6, 
    borderRadius: 15,
    paddingVertical: Platform.OS === 'ios' ? wp("2.5%") : wp("2.22%"),
    paddingHorizontal: Platform.OS === 'ios' ? wp("4%") : wp("3.8%"),
    color: "gray",
    borderColor: "gray",
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Helps with border radius rendering on iOS
  },
  activeTitle: {
    borderColor: "#832DA4",
    fontFamily: Platform.OS === 'ios' ? "System" : "notoSans",
    backgroundColor: "#D9D0E6",
    color: "black",
  },
});

export default Styles;