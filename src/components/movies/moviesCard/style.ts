import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../../constants/theme';

const Styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.sm,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    ...Shadows.md,
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: hp("25%"),
    paddingHorizontal: Spacing.sm,
  },
  noMoviesText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: hp("7%"),
    fontWeight: Typography.fontWeight.medium,
  },
  image: {
    width: wp("28%"),
    height: hp("15%"),
    borderRadius: BorderRadius.lg,
    resizeMode: "cover",
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },

  movieName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    maxWidth: wp("25%"),
    marginBottom: Spacing.xs,
  },
  movieLang: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  activeTitle: {
    borderWidth: 2,
    borderColor: Colors.primary,
    transform: [{ scale: 1.05 }],
    ...Shadows.lg,
  },
});

export default Styles;
