import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import MovieDescription from '../../../../../components/movies/movieDescription';
import { useTypedSelector } from '../../../../../store/rootStore';
import { ITheatre } from '../../../../../models/getAllTheatres';
import { getAllTheatres } from '../../../../../actions/getAllTheatres';
import { useDispatch } from "react-redux";
import NotFound from '../../../../../components/movies/notFound';
import Styles from './style';

interface Theatre {
  id: number;
  name: string;
  image_url: string;
  address: string;
}

interface TheatreListProps {
  searchText: string;
  navigation: any;
}

const TheatreListScreen: React.FC<TheatreListProps> = ({ searchText, navigation }) => {
  const styles = Styles();
  const location = "";
  const dispatch = useDispatch();
  const theatreData = useTypedSelector((state) => state.GetAllTheatresReducer);
  const theatre: ITheatre[] = theatreData?.data?.theatres || [];
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getAllTheatres({ location }));
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getAllTheatres({ location }));
    setRefreshing(false);
  };

  const filteredTheatre = theatre.filter((theatre) =>
    theatre.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (filteredTheatre.length === 0) {
    return <NotFound text={"No Theatre Found"} />;
  }

  const renderMovie = ({ item }: { item: Theatre }) => (
    <TouchableOpacity style={{ backgroundColor: "white" }}>
      <View style={styles.searchMovieCard}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.movieImage}
        />
        <MovieDescription
          title={item.name}
          year={item.address}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredTheatre}
      style={styles.flatListStyles}
      renderItem={renderMovie}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default TheatreListScreen;