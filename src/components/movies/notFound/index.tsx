import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NoMovieFoundIcon from "../../icons/noMovieFound";

interface NoMoviesFoundProps {
  text: string;
}

const NotFound: React.FC<NoMoviesFoundProps> = ({ text }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <NoMovieFoundIcon />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "gray",
    paddingBottom: 80,
  },
});

export default NotFound;