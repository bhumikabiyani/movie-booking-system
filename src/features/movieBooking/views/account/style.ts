import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Styles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
    },
    comingSoonText: {
      color: "#000",
      fontSize: wp("5%"),
      textAlign: "center",
    },
  });

export default Styles;