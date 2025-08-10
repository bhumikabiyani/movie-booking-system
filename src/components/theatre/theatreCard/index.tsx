import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import Styles from "./style";
import { ITheatre } from "../../../models/getAllTheatres";
import { useTypedSelector } from "../../../store/rootStore";

const styles = Styles;

export function TheatreCard() {
  const theatresState = useTypedSelector(
    (state) => state.GetAllTheatresReducer
  );
  const theatres: ITheatre[] = theatresState?.data?.theatres || [];

  const numColumns1 = Math.ceil(theatres.length / 2);

  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      {theatres.length === 0 ? (
        <Text style={styles.noTheatreText}>No theatres found</Text>
      ) : (
        <FlatList
          key={numColumns1}
          scrollEnabled={false}
          contentContainerStyle={{
            alignSelf: "flex-start",
          }}
          numColumns={numColumns1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={theatres}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View>
                <Text
                  style={styles.theatreName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text
                  style={styles.theatreAddress}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.address}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}
