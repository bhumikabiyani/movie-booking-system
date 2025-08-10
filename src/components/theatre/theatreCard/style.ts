import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";


const Styles = StyleSheet.create({
  card: {
    padding: wp("0.7%"),
    marginVertical: hp("1%"),
  },
  noTheatreText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: hp("7%"),
  },
  image: {
    width: wp("30%"),
    height: hp("13%"),
    borderRadius: wp("3%"),
    objectFit: "fill"
  },
  theatreName: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    flexWrap: "wrap",
    maxWidth: wp("25%"), 
  },
  theatreAddress: {
    fontSize: wp("3.5%"),
    color: "#333",
    flexWrap: "wrap",
    maxWidth: wp("25%"), 
  },
  activeTitle: {
    borderColor: "#832DA4",
    backgroundColor: "#D9D0E6",
    color: "black",
  },
});

export default Styles;