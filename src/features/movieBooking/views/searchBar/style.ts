import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Styles = () =>
  StyleSheet.create({
    container: {
      height: hp("100%"),
      backgroundColor: "white",
    },
    searchContainer: {
      backgroundColor: "#fff",
      marginTop: hp("2%"),
    },
    searchBar: {
      borderWidth: wp("0.25%"), 
      borderRadius: wp("2.25%"), 
    },
    activeTab: {
      borderBottomColor: "#6A1B9A",
    },
    activeTabText: {
      color: "#6A1B9A",
    },
    searchMovieCard: {
      flexDirection: "row",
      borderRadius: 4,
      marginTop: hp("2%"),
      width: wp("96%"),
      height: wp("20%"),
      borderWidth: 1,
      backgroundColor: "green",
    },
    movieImage: {
      width: wp("20%"),
      height: wp("19.5%"),
      borderRadius: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      borderColor: "#000",
    },
    imageTextContainer: {
      flex: 1,
      fontSize: hp("3%"),
      color: "#000",
      
    },
  });

export default Styles;
