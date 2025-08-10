import React from "react";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Styles = () =>
  StyleSheet.create({
    background: {},
    dropIcon: {
      padding: wp("5%"),
      height: hp("20%"),
      width: wp("100%"),
    },
    movieContent: {
      backgroundColor: "#FFFFFF",
      gap: wp("2%"),
      padding: wp("4%"),
    },
    movieName: {
      fontFamily: "notoSans",
      fontWeight: "600",
      color: "#14171A",
      fontSize: wp("5%"),
      lineHeight: hp("3%"),
    },
    movieProperties: {
      fontFamily: "notoSans",
      fontWeight: "400",
      color: "#14171A",
      fontSize: wp("3.5%"),
      lineHeight: hp("2.25%"),
    },
    movieDescription: {
      fontFamily: "notoSans",
      fontWeight: "400",
      color: "#706E6B",
      fontSize: wp("3%"),
      lineHeight: hp("2%"),
      flexWrap: "wrap",
      flexShrink: 1,
    },
    movieDates: {
      height: hp("7.5%"),
      width: wp("100%"),
      marginTop: hp("2%"),
    },
    rating: {
      fontWeight: "bold",
      backgroundColor: "#E9ECF0",
      borderRadius: 4,
      borderWidth: 1,
      borderBottomLeftRadius: 15,
      borderTopRightRadius: 15,
      borderColor: "black",
    },
    separator: {
      width: wp("10%"),
      height: 2,
      backgroundColor: "#000",
      alignSelf: "center",
      marginVertical: hp("2%"),
    },
  });

export default Styles;
