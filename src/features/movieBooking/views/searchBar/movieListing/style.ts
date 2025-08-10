import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    flatlistStyle: {
      marginBottom: wp("12.3%"),
      backgroundColor: "white",
    },
    searchMovieCard: {
      flexDirection: "row",
      padding: wp("0.3%"),
      margin: wp("1.25%"),
      borderWidth: 1,
      borderColor: "grey",
      borderRadius: wp("2.5%"),
      alignItems: "center",
      backgroundColor: "white",
      overflow: "hidden",
    },
    movieImage: {
      width: wp("25%"),
      height: hp("20%"),
      borderRadius: wp("2.5%"),
    },
  });

export default useStyles;
