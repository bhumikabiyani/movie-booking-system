import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 20,
      height: hp("85%"),
      marginTop: hp("15%"),
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    flatListLeft: {
      marginLeft: wp("5%"),
    },
    flatListRight: {
      marginRight: wp("5%"),
    },
    disabledBookButton: {
      backgroundColor: "#ccc",
      padding: hp("1.5%"),
      borderRadius: 8,
      alignItems: "center",
      marginTop: hp("2%"),
    },
    movieInfo: {
      alignItems: "flex-start",
    },
    cinemaText: {
      fontSize: hp("2%"),
      fontFamily: "notoSans",
      color: "#000",
      lineHeight: hp("2.5%"),
      textAlign: "center",
      marginLeft: wp("25%"),
    },
    movieText: {
      fontSize: hp("1.5%"),
      color: "#555",
      marginVertical: 5,
    },
    screenDirection: {
      textAlign: "center",
      width: wp("73%"),
      height: hp("3.5%"),
      color: "#aaa",
      left: wp("5%"),
    },
    screenIndicator: {
      height: hp("1.75%"),
      width: wp("73%"),
      backgroundColor: "#ccc",
      marginBottom: 20,
      marginHorizontal: 30,
    },
    seatRow: {
      flexDirection: "row",
      marginVertical: wp("2.7%"),
    },
    seat: {
      width: 20,
      height: 20,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      margin: wp("1.11%"),
    },
    availableSeat: {
      backgroundColor: "#f2f2f2",
    },
    selectedSeat: {
      backgroundColor: "#6A1B9A",
      borderColor: "#6A1B9A",
    },
    bookedSeat: {
      backgroundColor: "#ccc",
    },
    seatText: {
      color: "#ccc",
      fontSize: 10,
    },
    layout: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: wp("99.9%"),
      height: hp("50%"),
      right: wp("1.3%"),
      borderBottomWidth: 1,
      borderBottomColor: "#E3E3E3",
    },

    bookButton: {
      backgroundColor: "#4A148C",
      padding: hp("1.5%"),
      borderRadius: 8,
      alignItems: "center",
      marginTop: hp("2%"),
    },
    bookButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};

export default useStyles;
