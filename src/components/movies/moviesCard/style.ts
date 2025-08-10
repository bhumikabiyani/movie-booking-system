import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Styles = StyleSheet.create({
  card: {
    marginVertical: hp("1.5%"),
    padding: wp("0.7%"),
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: hp("22%"),
    textAlign: "center",
  },
  noMoviesText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginTop: hp("7%"),
  },
  image: {
    width: wp("30%"),
    height: hp("13%"),
    borderRadius: wp("3%"),
    objectFit: "fill",
  },

  movieName: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    flexWrap: "wrap",
    maxWidth: wp("25%"),
  },
  movieLang: {
    fontSize: wp("3.5%"),
    color: "#333",
  },
  activeTitle: {
    borderColor: "#832DA4",
    backgroundColor: "#D9D0E6",
    color: "black",
  },
});

export default Styles;
