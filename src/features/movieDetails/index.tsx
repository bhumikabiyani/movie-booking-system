import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowIcon from "../../components/icons/arrowIcon";
import CinemaList from "../../components/theatre/theatreList";
import DropDownFilled from "../../components/icons/dropDownFilled";
import Styles from "./style";
import { getMovieDetail } from "../../actions/getMovieDetail";
import { RootState } from "../../store/rootStore";
import { getShowsByMovieId } from "../../actions/getShowsByMovieId";
import SeatBooking from "../seatSelection";
import {
  getBookedSeatsForShow,
  getBookedSeatsForShowReset,
} from "../../actions/getBookedSeatsForShow";

const styles = Styles();

interface MovieDetailsProps {
  navigation: any;
  route: any;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ navigation, route }) => {
  const movieId = route?.params?.movieId;
  const dispatch = useDispatch();
  const movieDetail = useSelector(
    (state: RootState) => state.GetMovieDetailReducer
  );
  const [showSeatBooking, setShowSeatBooking] = useState(false);
  const [selectedShowID, setSelectedShowID] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  console.log("abcd movieId", movieId);
  useEffect(() => {
    if (movieId) {
      dispatch(getMovieDetail({ movieId }));
      dispatch(getShowsByMovieId({ movieId }));
    }
  }, [movieId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (movieId) {
      dispatch(getMovieDetail({ movieId }));
      dispatch(getShowsByMovieId({ movieId }));
    }
    setRefreshing(false);
  };

  const openSeatMap = (showID: number) => {
    console.log("Opening seat map");
    dispatch(getBookedSeatsForShow({ showId: showID }));
    setSelectedShowID(showID);
    setShowSeatBooking(true);
  };

  const closeSeatMap = () => {
    console.log("Closing seat map");
    dispatch(getBookedSeatsForShowReset());
    setShowSeatBooking(false);
  };

  if (movieDetail.isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (movieDetail.error) {
    return <Text>Error: {movieDetail?.error?.errorMessage}</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground
          source={{
            uri: movieDetail?.data?.movie?.image_url,
          }}
          style={styles.background}
          resizeMode="repeat"
        >
          <View style={styles.dropIcon}>
            <ArrowIcon />
          </View>
        </ImageBackground>
        <View style={styles.movieContent}>
          <Text style={styles.movieName}>{movieDetail?.data?.movie?.name}</Text>
          <Text style={styles.movieProperties}>
            {movieDetail?.data?.movie?.language}
            <Text> </Text>
            <Text style={styles.rating}>
              {movieDetail?.data?.movie?.rating}
            </Text>{" "}
            {movieDetail.data?.movie?.year} . {movieDetail.data?.movie?.genre} .{" "}
            {movieDetail.data?.movie?.duration}
          </Text>
          <Text style={styles.movieDescription}>
            {movieDetail.data?.movie?.description}
          </Text>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <DropDownFilled />
          </View>
        </View>

        <View>
          <CinemaList openSeatMap={openSeatMap} />
          {showSeatBooking && selectedShowID !== null && (
            <Modal
              visible={showSeatBooking}
              animationType="slide"
              transparent={true}
              onRequestClose={closeSeatMap}
            >
              <SeatBooking
                onClose={closeSeatMap}
                navigation={navigation}
                showID={selectedShowID}
              />
            </Modal>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;
