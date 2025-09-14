import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      padding: Spacing.lg,
      height: hp("85%"),
      marginTop: hp("15%"),
      borderTopLeftRadius: BorderRadius['3xl'],
      borderTopRightRadius: BorderRadius['3xl'],
      ...Shadows.xl,
    },
    flatListLeft: {
      marginLeft: wp("5%"),
    },
    flatListRight: {
      marginRight: wp("5%"),
    },
    disabledBookButton: {
      backgroundColor: Colors.seatDisabled,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      borderRadius: BorderRadius.xl,
      alignItems: "center",
      marginTop: Spacing.lg,
      marginHorizontal: Spacing.md,
      opacity: 0.6,
    },
    movieInfo: {
      alignItems: "flex-start",
    },
    cinemaText: {
      fontSize: Typography.fontSize.xl,
      fontFamily: Typography.fontFamily,
      fontWeight: Typography.fontWeight.bold,
      color: Colors.textPrimary,
      lineHeight: Typography.lineHeight.normal,
      textAlign: "center",
      marginLeft: wp("25%"),
    },
    movieText: {
      fontSize: hp("1.5%"),
      color: "#555",
      marginVertical: 5,
    },
    screenDirection: {
      textAlign: "center",
      width: wp("73%"),
      height: hp("3.5%"),
      color: Colors.textLight,
      left: wp("5%"),
      fontSize: Typography.fontSize.sm,
      fontWeight: Typography.fontWeight.medium,
      letterSpacing: 1,
    },
    screenIndicator: {
      height: hp("1.75%"),
      width: wp("73%"),
      backgroundColor: Colors.primary,
      marginBottom: Spacing.lg,
      marginHorizontal: Spacing['3xl'],
      borderRadius: BorderRadius.full,
      ...Shadows.sm,
    },
    seatRow: {
      flexDirection: "row",
      marginVertical: wp("2.7%"),
    },
    seat: {
      width: wp('6%'), // Increased from 20 for better accessibility
      height: wp('6%'),
      borderRadius: BorderRadius.md,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: Colors.border,
      margin: wp("1.11%"),
      ...Shadows.sm,
    },
    availableSeat: {
      backgroundColor: Colors.seatAvailable,
      borderColor: Colors.borderLight,
    },
    selectedSeat: {
      backgroundColor: Colors.primary,
      borderColor: Colors.primaryDark,
      transform: [{ scale: 1.1 }], // Subtle scale animation
      ...Shadows.md,
    },
    bookedSeat: {
      backgroundColor: Colors.seatBooked,
      borderColor: Colors.borderDark,
      opacity: 0.6,
    },
    seatText: {
      color: Colors.textSecondary,
      fontSize: Typography.fontSize.xs,
      fontWeight: Typography.fontWeight.medium,
    },
    layout: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: wp("99.9%"),
      height: hp("50%"),
      right: wp("1.3%"),
      borderBottomWidth: 1,
      borderBottomColor: Colors.borderLight,
      paddingBottom: Spacing.md,
    },

    bookButton: {
      backgroundColor: Colors.primary,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      borderRadius: BorderRadius.xl,
      alignItems: "center",
      marginTop: Spacing.lg,
      marginHorizontal: Spacing.md,
      ...Shadows.lg,
    },
    bookButtonText: {
      color: Colors.textOnPrimary,
      fontSize: Typography.fontSize.lg,
      fontWeight: Typography.fontWeight.bold,
      letterSpacing: 0.5,
    },
  });
};

export default useStyles;
