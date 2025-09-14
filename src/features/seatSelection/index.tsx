import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useStyles from "./style";
import CrossIcon from "../../components/icons/crossIcon";
import { useDispatch } from "react-redux";
import { createBooking, createBookingReset } from "../../actions/createBooking";
import { useTypedSelector } from "../../store/rootStore";
import {
  getBookedSeatsForShowReset,
} from "../../actions/getBookedSeatsForShow";
const style = useStyles();

interface seatProp {
  onClose: () => void;
  navigation: any;
  showID: number;
}

const SeatBooking = (props: seatProp) => {
  const dispatch = useDispatch();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bookedSeatsData = useTypedSelector(
    (state) => state.GetBookedSeatsForShowReducer
  );
  const blockedSeats: string[] = bookedSeatsData?.data?.seats || [];

  useEffect(() => {
    if (bookedSeatsData.isSuccess && blockedSeats.length >= 0) {
      setBookedSeats(blockedSeats);
      console.log("Updated booked seats:", blockedSeats);
    }
  }, [bookedSeatsData.isSuccess, blockedSeats]);

  console.log({ bookedSeatsData });

  const seatLayoutLeft = [
    ["A1", "A2", "A3", "A4", "A5"],
    ["B1", "B2", "B3", "B4", "B5"],
    ["C1", "C2", "C3", "C4", "C5"],
    ["D1", "D2", "D3", "D4", "D5"],
    ["E1", "E2", "E3", "E4", "E5"],
    ["F1", "F2", "F3", "F4", "F5"],
    ["G1", "G2", "G3", "G4", "G5"],
    ["H1", "H2", "H3", "H4", "H5"],
    ["I1", "I2", "I3", "I4", "I5"],
    ["J1", "J2", "J3", "J4", "J5"],
  ];

  const rightSeatLayout = [
    ["A6", "A7", "A8", "A9", "A10"],
    ["B6", "B7", "B8", "B9", "B10"],
    ["C6", "C7", "C8", "C9", "C10"],
    ["D6", "D7", "D8", "D9", "D10"],
    ["E6", "E7", "E8", "E9", "E10"],
    ["F6", "F7", "F8", "F9", "F10"],
    ["G6", "G7", "G8", "G9", "G10"],
    ["H6", "H7", "H8", "H9", "H10"],
    ["I6", "I7", "I8", "I9", "I10"],
    ["J6", "J7", "J8", "J9", "J10"],
  ];

  const seatPrice = 150;
  const createTicketState = useTypedSelector(
    (state) => state.CreateBookingReducer
  );

  const toggleSeatSelection = (seat: string) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = () => {
    if (selectedSeats.length === 0) {
      console.warn("No seats selected for booking");
      return;
    }
    
    setIsLoading(true);
    
    dispatch(
      createBooking({
        show_id: props.showID,
        seats: selectedSeats,
      })
    );
  };

  useEffect(() => {
    if (createTicketState?.isSuccess) {
      setIsLoading(false);
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      setSelectedSeats([]);
      props.onClose();
      props.navigation.navigate("Movies", {
        screen: "Success",
        params: { id: createTicketState?.data?.booking },
      });
      dispatch(getBookedSeatsForShowReset());
      dispatch(createBookingReset());
    } else if (createTicketState?.error) {
      setIsLoading(false);
      setSelectedSeats([]);
      console.error("Booking failed:", createTicketState?.error);
      Alert.alert(
        "Booking Failed",
        "Please try again or select different seats.",
        [{ text: "OK" }]
      );
      dispatch(createBookingReset());
    }
  }, [createTicketState]);

  console.log({ createTicketState });

  const renderSeatRow = (row: string[]) => {
    return (
      <View style={style.seatRow}>
        {row.map((seat) => (
          <TouchableOpacity
            key={seat}
            style={[
              style.seat,
              bookedSeats.includes(seat)
                ? style.bookedSeat
                : selectedSeats.includes(seat)
                ? style.selectedSeat
                : style.availableSeat,
            ]}
            onPress={() => toggleSeatSelection(seat)}
            disabled={blockedSeats.includes(seat)}
            accessible={true}
            accessibilityLabel={`Seat ${seat}`}
            accessibilityHint={
              blockedSeats.includes(seat)
                ? "This seat is already booked"
                : selectedSeats.includes(seat)
                ? "Tap to deselect this seat"
                : "Tap to select this seat"
            }
            accessibilityRole="button"
            accessibilityState={{
              selected: selectedSeats.includes(seat),
              disabled: blockedSeats.includes(seat),
            }}
          >
            <Text style={style.seatText}>{seat}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 8,
          marginVertical: 20,
        }}
      >
        <View style={style.movieInfo}>
          <Text style={style.cinemaText}>Book Your Seats!!</Text>
          {/* <Text style={style.movieText}>Matrix • English • 7:00 pm</Text> */}
        </View>
        <TouchableOpacity onPress={props.onClose}>
          <CrossIcon />
        </TouchableOpacity>
      </View>

      <Text style={style.screenDirection}>SCREEN THIS WAY</Text>
      <View style={style.screenIndicator} />

      <View style={style.layout}>
        <FlatList
          data={seatLayoutLeft}
          style={style.flatListLeft}
          renderItem={({ item }) => renderSeatRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          style={style.flatListRight}
          data={rightSeatLayout}
          renderItem={({ item }) => renderSeatRow(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {isLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        <TouchableOpacity
          style={[
            style.bookButton,
            selectedSeats.length === 0 && style.disabledBookButton,
          ]}
          onPress={() => handleSubmit()}
          disabled={selectedSeats.length === 0}
          accessible={true}
          accessibilityLabel={`Book ${selectedSeats.length} seats for ${selectedSeats.length * seatPrice} rupees`}
          accessibilityHint={selectedSeats.length === 0 ? "Select seats to enable booking" : "Tap to confirm your booking"}
          accessibilityRole="button"
          accessibilityState={{ disabled: selectedSeats.length === 0 }}
        >
          <Text style={style.bookButtonText}>
            BOOK ₹ {selectedSeats.length * seatPrice}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SeatBooking;
