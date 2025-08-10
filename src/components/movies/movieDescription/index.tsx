import React from "react";
import useStyles from "./style";
import { Text, View } from "react-native";
const styles = useStyles();
interface CardProps {
  title: string;
  language?: string;
  rating?: string;
  year?: string;
  genre?: string;
  description?: string;
  duration?: string;
  seats?: string;
  summary?: string;
  ticket_id?: string;
  address?: string;
}
const MovieDescription: React.FC<CardProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {props.title}
      </Text>
      <View style={styles.caption}>
        {props.seats && (
          <Text style={styles.captionText}>Seats: {props.seats}</Text>
        )}
        {props.ticket_id && (
          <Text style={styles.captionText}>{props.ticket_id}</Text>
        )}

        {props.language && (
          <Text style={styles.captionText}>{props.language}</Text>
        )}
        {props.rating && <Text style={styles.rating}>{props.rating}</Text>}
        <Text style={styles.captionText}>{props.year}</Text>
        <Text style={styles.captionText}>{props.genre}</Text>
        <Text style={styles.captionText}>{props.duration}</Text>
        <Text style={styles.address}>{props.address}</Text>
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.descriptionContainer}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {props.description}
          </Text>
        </View>
      </View>
      {!!props.summary && <Text style={styles.summary}>{props.summary}</Text>}
    </View>
  );
};
export default MovieDescription;
