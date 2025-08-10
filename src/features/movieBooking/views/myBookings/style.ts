import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Styles = () => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: wp("4%"),
  },
  title: {
    fontSize: wp("7%"),
    fontFamily: "notoSans-Bold",
    marginBottom: hp("2%"),
    color: "#333",
    textAlign: "center",
  },
  flatListStyle: {
    paddingBottom: wp("10%"),
  },
  searchMovieCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginVertical: hp("1%"),
    marginHorizontal: wp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    padding: wp("2%"),
  },
  movieImage: {
    width: wp("20%"),
    height: wp("25%"),
    alignSelf: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageTextContainer: {
    flex: 1,
    justifyContent: "center",
    maxWidth: wp("60%"),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: hp("1%"),
    fontSize: wp("4%"),
    color: "#666",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: wp("4%"),
  },
  emptyMessage: {
    fontSize: wp("5%"),
    color: "#666",
    textAlign: "center",
    marginTop: hp("2%"),
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("5%"),
    borderRadius: 4,
    alignItems: "center",
    marginTop: hp("1%"),
  },
  buttonText: {
    fontSize: hp("2%"),
    color: "#FFF",
  },
});

export default Styles;
