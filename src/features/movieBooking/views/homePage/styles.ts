import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const useStyles = () =>
  StyleSheet.create({
    pageContainer: {
      backgroundColor: "#fff",
      paddingRight: wp("3%"),
    },
    headercontainer: {
      paddingLeft: wp("3%"),
      fontFamily: "notoSans",
      height: hp("13%"),
      backgroundColor: "#fff",
    },
    noMoviesText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 16,
      color: "grey",
    },
    headerLocation: {
      paddingLeft: wp("3%"),
      flexDirection: "row",
      alignItems: "center",
      width: wp("84%"),
      height: hp("3%"),
      position: "absolute",
      marginTop: hp("8%"),
      opacity: 1,
      gap: wp("3%"),
    },
    divider: {
      height: 1,
      backgroundColor: "#E0E0E0",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 3,
      width: wp("100%"),
    },
    h2: {
      color: "#6A1B9A",
      fontSize: wp("5.5%"),
      fontFamily: "notoSans",
      marginTop: hp("3%"),
      fontWeight: "600",
    },
    locationText: {
      fontSize: wp("4%"),
      fontWeight: "400",
      color: "#3C444D",
    },
    locationIcon: {
      width: wp("5%"),
      height: hp("3%"),
    },
    languageFilter: {
      marginTop: hp("1%"),
      paddingLeft: wp("3%"),
    },
    movieBox: {
      marginVertical: hp("2%"),
    },
    movieHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    moviesText: {
      fontFamily: "notoSans",
      color: "#000",
      fontSize: wp("4.5%"),
    },
  });

export default useStyles;
