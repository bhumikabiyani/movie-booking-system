import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Styles = () =>
  StyleSheet.create({
    container: {
      borderBottomColor: "#ccc",
      borderBottomWidth: 0.9,
      marginTop: hp("1%"),
    },
    backArrowIcon: {
      padding: wp("6%"),
    },
    textContainer: {
      fontFamily: "notoSans",
      fontSize: hp("2.25%"),
      lineHeight: hp("3%"),
      color: "#000",
      textAlign: "center",
    },
    movieImage: {
      width: wp("100%"),
      height: hp("20%"),
      borderTopLeftRadius: hp("4%"),
      borderTopRightRadius: hp("4%"),
      marginTop: hp("2%"),
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: hp("1.25%"),
      marginRight: wp("5%"),
      marginLeft: wp("5%"),
      fontFamily: "notoSans",
    },
    label: {
      fontSize: hp("1.5%"),
      color: "gray",
      marginRight: wp("3%"),
    },
    value: {
      fontSize: hp("1.5%"),
      fontWeight: "bold",
      color: "#000",
    },
    SeatsValue: {
      fontSize: hp("1.5%"),
      fontWeight: "bold",
      color: "#000"
        },
    qrCode: {
      width: 150,
      height: 150,
      alignSelf: "center",
      marginTop: 20,
    },
  });

export default Styles;
