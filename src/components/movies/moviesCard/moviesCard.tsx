import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import Styles from "./style";
import { useTypedSelector } from "../../../store/rootStore";
import { IMovie } from "../../../models/getAllMovies";
import { MovieCardSkeleton } from '../../common/SkeletonLoader';

interface MoviesCardProps {
  onMovieSelect?: (movie: IMovie) => void;
  navigation: any;
}

const MoviesCard: React.FC<MoviesCardProps> = ({
  onMovieSelect,
  navigation,
}) => {
  const [selectedMovie, setSelectedMovie] = React.useState<IMovie | null>(null);

  const moviesState = useTypedSelector((state) => state.GetAllMoviesReducer);
  const movies: IMovie[] = moviesState?.data?.movies || [];
  const isLoading = moviesState?.isLoading || false;

  const handleMoviePress = (movie: IMovie) => {
    setSelectedMovie(movie);
    navigation.navigate("MoviesDetails", { movieId: movie.id });
    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  return (
    <View style={Styles.cardContainer}>
      {isLoading ? (
        <FlatList
          horizontal={true}
          data={[1, 2, 3]} // Show 3 skeleton cards
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <MovieCardSkeleton />}
          showsHorizontalScrollIndicator={false}
        />
      ) : movies.length === 0 ? (
        <Text style={Styles.noMoviesText}>No movies found</Text>
      ) : (
        <FlatList
          horizontal={true}
          data={movies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMoviePress(item)}
              activeOpacity={0.7}
              style={Styles.card}
              accessible={true}
              accessibilityLabel={`${item.name} movie in ${item.language}`}
              accessibilityHint="Tap to view movie details and book tickets"
              accessibilityRole="button"
            >
              <Image
                source={{ uri: item.image_url }}
                style={[
                  Styles.image,
                  selectedMovie === item && Styles.activeTitle,
                ]}
                onError={(err) => console.log(err)}
              />
              <Text
                style={Styles.movieName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text style={Styles.movieLang}>{item.language}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default MoviesCard;
