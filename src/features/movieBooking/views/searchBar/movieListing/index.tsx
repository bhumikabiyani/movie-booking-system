import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import MovieDescription from "../../../../../components/movies/movieDescription";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../../store/rootStore";
import { IMovie } from "../../../../../models/getAllMovies";
import { getAllMovies } from "../../../../../actions/getAllMovies";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import NotFound from "../../../../../components/movies/notFound";
import useStyles from "./style";

interface Movie {
  id: number;
  name: string;
  language: string;
  image_url: string;
  description: string;
  genre: string;
  duration: string;
}
interface MovieListProps {
  navigation: NativeStackNavigationProp<any>;
  searchText: string;
}

const MovieListScreen: React.FC<MovieListProps> = ({ navigation, searchText }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const language = "";
  const moviesData = useTypedSelector((state) => state.GetAllMoviesReducer);
  const movies: IMovie[] = moviesData?.data?.movies || [];
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getAllMovies({ language }));
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getAllMovies({ language }));
    setRefreshing(false);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (moviesData.isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (filteredMovies.length === 0) {
    return <NotFound text={"No Movies Found"} />;
  }

  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={{ backgroundColor: "white" }}
      onPress={() => navigation.navigate("MoviesScreen", { movieId: item.id })}
    >
      <View style={styles.searchMovieCard}>
        <Image source={{ uri: item.image_url }} style={styles.movieImage} />
        <MovieDescription
          title={item.name}
          language={item.language}
          description={item.description}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredMovies}
      style={styles.flatlistStyle}
      renderItem={renderMovie}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default MovieListScreen;