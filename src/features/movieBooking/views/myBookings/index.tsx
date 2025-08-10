import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Styles from "./style";
import MovieDescription from "../../../../components/movies/movieDescription";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { getAllBookings } from "../../../../actions/getAllBookings";
import { useTypedSelector } from "../../../../store/rootStore";
import { IAllBooking } from "../../../../models/getAllBookings";

interface BookingProps {
  navigation: NativeStackNavigationProp<any>;
}

const styles = Styles();

type Ticket = {
  id: number;
  movieTitle: string;
  imageUrl: string;
  seats: string;
};

const TicketListingScreen: React.FC<BookingProps> = ({ navigation }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const bookingsData = useTypedSelector((state) => state.GetAllBookingsReducer);
  const bookings: IAllBooking[] = bookingsData?.data?.booking || [];

  const fetchData = async () => {
    setLoading(true);
    await dispatch(getAllBookings());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (bookings.length > 0) {
      const mappedTickets = bookings.reverse().map((booking) => ({
        id: booking.booking_id,
        movieTitle: booking.booking_info.movie_name,
        imageUrl: booking.booking_info.image_url,
        seats: booking.booking_info.seats.join(" "),
      }));
      setTickets(mappedTickets);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [bookings]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const renderTicket = ({ item }: { item: Ticket }) => (
    <TouchableOpacity
      style={styles.searchMovieCard}
      onPress={() => navigation.navigate("Ticket", { id: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.movieImage} />
      <View style={styles.imageTextContainer}>
        <MovieDescription seats={item.seats} title={item.movieTitle} />
      </View>
    </TouchableOpacity>
  );

  if (bookingsData.isLoading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : tickets.length > 0 ? (
        <FlatList
          data={tickets}
          renderItem={renderTicket}
          style={styles.flatListStyle}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.emptyMessage}>No bookings found</Text>
      )}
    </SafeAreaView>
  );
};

export default TicketListingScreen;