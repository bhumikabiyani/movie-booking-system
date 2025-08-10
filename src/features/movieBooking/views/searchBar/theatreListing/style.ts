import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Styles = () =>
  StyleSheet.create({
    flatListStyles: {
      marginBottom: wp("12.3%"),
    },
    searchMovieCard: {
      flexDirection: "row",
      padding: wp("0.8%"),
      margin: wp("1.25%"),
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: wp("2.5%"),
    },
    movieImage: {
      width: wp("25%"),
      height: hp("18%"),
      borderRadius: wp("2.5%"),
    },
    imageTextContainer: {
      flex: 1,
      marginLeft: wp("2.5%"),
      justifyContent: "center",
    },
    movieTitle: {
      fontSize: wp("4%"),
      fontFamily: "notoSans",
      fontWeight: "bold",
    },
    movieAddress: {
      fontSize: wp("3.5%"),
      color: "grey",
    },
  });

export default Styles;
