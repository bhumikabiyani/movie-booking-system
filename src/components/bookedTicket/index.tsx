import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { getTicketDetail } from "../../actions/getTicket";
import Styles from "./style";
import ArrowIcon from "../icons/arrowIcon";
import MovieDescription from "../movies/movieDescription";
import { useRoute } from "@react-navigation/native";

interface myBookingProps {
  id: number;
}

const Ticket: React.FC = () => {
  const styles = Styles();
  const dispatch = useDispatch();

  const ticketData = useSelector(
    (state: RootState) => state.GetTicketDetailReducer
  );
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showDateFormatted, setShowDateFormatted] = useState<string>("");
  const [showTimeFormatted, setShowTimeFormatted] = useState<string>("");

  const route = useRoute();
  const { id } = route.params as myBookingProps;

  useEffect(() => {
    if (id) {
      dispatch(getTicketDetail({ bookingId: id }));
    }
  }, [id]);

  useEffect(() => {
    if (ticketData.isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
      setRefreshing(false);
      const booking = ticketData?.data?.booking;
      if (booking) {
        const showDate = booking.booking_info?.show_date
          ? new Date(booking.booking_info.show_date).toLocaleDateString()
          : "N/A";
        const showTime = booking.booking_info?.show_start_time
          ? new Date(booking.booking_info.show_start_time).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            )
          : "N/A";
        setShowDateFormatted(showDate);
        setShowTimeFormatted(showTime);
      }
    }
  }, [ticketData]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getTicketDetail({ bookingId: id }));
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (ticketData.error) {
    return <Text>Error: {ticketData.error.errorMessage}</Text>;
  }

  const booking = ticketData?.data?.booking;

  if (!booking) {
    return <Text>No booking data available</Text>;
  }

  const { booking_info, ticket_no, total_seats_booked } = booking;
  const seats = booking_info?.seats || [];
  const seatsFormatted = seats.length > 0 ? seats.join(", ") : "N/A";

  return (
    <SafeAreaView>
      <ScrollView
        // contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <View style={styles.backArrowIcon}>
            <ArrowIcon fill="#000" />
          </View>
          <Text style={styles.textContainer}>Ticket Booked</Text>
          <Image
            source={{ uri: booking_info?.image_url }}
            style={styles.movieImage}
          />

          <MovieDescription
            title={booking_info?.movie_name}
            language={booking_info?.language}
            rating={booking_info?.rating}
            year={booking_info?.release_dates}
            genre={booking_info?.genre}
            duration={booking_info?.duration}
          />
        </View>

        {/* Date and Show Time */}
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.label}>Show Time</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{showDateFormatted}</Text>
            <Text style={styles.value}>{showTimeFormatted}</Text>
          </View>
        </View>

        {/* Screen, Seats, and Ticket Number */}
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.label}>Screen</Text>
            <Text style={styles.value}>{booking_info?.theatre_id}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Seats ({total_seats_booked})</Text>
            <Text style={styles.SeatsValue}>{seatsFormatted}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ticket No.</Text>
            <Text style={styles.value}>{ticket_no}</Text>
          </View>
        </View>

        {/* QR Code */}
        <Image
          source={{
            // uri: "https://miro.medium.com/v2/resize:fit:789/1*A9YcoX1YxBUsTg7p-P6GBQ.png",
          }}
          style={styles.qrCode}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ticket;