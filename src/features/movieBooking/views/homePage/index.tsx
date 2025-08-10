import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import useStyles from "./styles";
import LocationIcon from "../../../../components/icons/LocationIcon";
import LanguageFilter from "../../../../components/movies/languageFilter/languageFilter";
import DropDownIcon from "../../../../components/movies/dropDown/dropDown";
import MoviesCard from "../../../../components/movies/moviesCard/moviesCard";
import SideArrow from "../../../../components/icons/sideArrow";
import { TheatreCard } from "../../../../components/theatre/theatreCard";
import { NavigationProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovies } from "../../../../actions/getAllMovies";
import { getAllTheatres } from "../../../../actions/getAllTheatres";

interface HomePageProps {
  navigation: NavigationProp<any>;
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    dispatch(getAllMovies({ language: "" }));
    dispatch(getAllTheatres({ location: "" }));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={styles.pageContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.headercontainer}>
            <Text style={styles.h2}>{"Hello John"}</Text>
            <View style={styles.headerLocation}>
              <LocationIcon />
              <DropDownIcon />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.languageFilter}>
            <LanguageFilter />

            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={styles.movieBox}>
                <View style={styles.movieHeader}>
                  <Text style={styles.moviesText}>{"Movies"}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Search", { screen: "Movies" })
                    }
                  >
                    <SideArrow />
                  </TouchableOpacity>
                </View>

                <MoviesCard navigation={navigation} />

                <View style={styles.movieHeader}>
                  <Text style={styles.moviesText}>{"Theatres"}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Search", { screen: "Theatres" })
                    }
                  >
                    <SideArrow />
                  </TouchableOpacity>
                </View>
                <TheatreCard />
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomePage;
