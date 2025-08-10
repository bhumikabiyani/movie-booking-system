import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const useStyles = () =>
  StyleSheet.create({
    cinemaContainer: {
      marginVertical: hp("1.25%"),
      paddingHorizontal: wp("3%"),
    },
    cinemaName: {
      fontSize: hp("1.75%"),
      fontFamily: "notoSans",
      marginBottom: hp("1%"),
      lineHeight: hp("2.25%"),
      color: "#000",
    },
    showtimeButton: {
      borderWidth: 1,
      borderRadius: wp("1%"),
      paddingVertical: hp("0.625%"),
      paddingHorizontal: wp("3.75%"),
      marginRight: wp("2.5%"),
    },
    defaultShowtime: {
      borderColor: "green",
    },
    selectedShowtime: {
      borderColor: "green",
    },
    showtimeText: {
      fontSize: hp("1.5%"),
      lineHeight: hp("2%"),
      fontFamily: "notoSans",
    },
    defaultShowtimeText: {
      color: "green",
    },
    selectedShowtimeText: {
      color: "green",
    },
    container: {
      backgroundColor: "#fff",
      height: hp("6.5%"),
      // width: wp("100%"),
    },
    dateItem: {
      alignItems: "center",
      paddingHorizontal: wp("3.75%"),
      marginLeft: wp("3%"),
      backgroundColor: "#fff",
    },
    dateText: {
      fontSize: wp("3%"),
      color: "#000",
    },
    dayText: {
      fontSize: wp("2.5%"),
      color: "#666",
    },
    selectedText: {
      color: "#6a0dad",
    },
    underline: {
      marginTop: hp("0.625%"),
      height: hp("0.25%"),
      width: "100%",
      backgroundColor: "#6a0dad",
    },
    flatListStyle: {
      height: hp("65%"),
      backgroundColor: "#fff",
    },
  });

export default useStyles;
