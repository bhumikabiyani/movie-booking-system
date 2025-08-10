import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useStyles from "./style";
import { IShowsByMovieId } from "../../../models/getShowsByMovieId";
import { useTypedSelector } from "../../../store/rootStore";

interface CinemaProps {
  openSeatMap: (showID: number) => void;
}

type Cinema = {
  id: string;
  cinema: string;
  showtimes: { time: string; showID: number }[];
};

interface DateItemProps {
  item: { date: string; day: string };
  isSelected: boolean;
  onPress: () => void;
}

const DateItem: React.FC<DateItemProps> = ({ item, isSelected, onPress }) => {
  const styles = useStyles();
  return (
    <TouchableOpacity onPress={onPress} style={styles.dateItem}>
      <Text style={[styles.dateText, isSelected && styles.selectedText]}>
        {item.date}
      </Text>
      <Text style={[styles.dayText, isSelected && styles.selectedText]}>
        {item.day}
      </Text>
      {isSelected && <View style={styles.underline} />}
    </TouchableOpacity>
  );
};

const CinemaList: React.FC<CinemaProps> = ({ openSeatMap }) => {
  const styles = useStyles();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowtimes, setSelectedShowtimes] = useState<
    Record<string, string>
  >({}); // Object to store selected showtimes for each cinema

  const showsState = useTypedSelector(
    (state) => state.GetShowsByMovieIdReducer
  );
  const data: IShowsByMovieId[] = showsState?.data?.shows || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const getDay = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "TODAY";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "TOMO";
    } else {
      return date
        .toLocaleDateString("en-GB", { weekday: "short" })
        .toUpperCase();
    }
  };

  const formatTime = (timeString: string): string => {
    const isoTimeString = timeString.replace(" ", "T");
    const options = {
      hour: "numeric" as const,
      minute: "numeric" as const,
      hour12: true,
      timeZone: "Asia/Kolkata",
    };
    return new Date(isoTimeString).toLocaleTimeString("en-US", options);
  };

  const dates = Array.from(
    new Map(
      data.map((item) => {
        const formattedDate = formatDate(item.date);
        const day = getDay(item.date);
        return [
          formattedDate,
          { date: formattedDate, day, originalDate: item.date },
        ];
      })
    ).values()
  ).sort(
    (a, b) =>
      new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime()
  );

  // Set the initial selected date if there is at least one date
  if (!selectedDate && dates.length > 0) {
    setSelectedDate(dates[0].date);
  }

  // Filter cinema data by selected date
  const cinemaData: Cinema[] = Object.values(
    data
      .filter((item) => formatDate(item.date) === selectedDate)
      .reduce((acc: Record<string, Cinema>, curr) => {
        const { theatre_id, theatre_name, start_time, id } = curr;

        if (!acc[theatre_id]) {
          acc[theatre_id] = {
            id: theatre_id.toString(),
            cinema: theatre_name,
            showtimes: [],
          };
        }
        acc[theatre_id].showtimes.push({
          time: formatTime(start_time),
          showID: id,
        });

        return acc;
      }, {})
  );

  const renderShowtimeItem = useCallback(
    ({
      item,
      cinemaId,
    }: {
      item: { time: string; showID: number };
      cinemaId: string;
    }) => {
      const isSelected = selectedShowtimes[cinemaId] === item.time;
      return (
        <TouchableOpacity
          style={styles.showtimeButton}
          onPress={() => {
            setSelectedShowtimes((prev) => ({
              ...prev,
              [cinemaId]: item.time,
            }));
            openSeatMap(item.showID);
          }}
        >
          <Text
            style={[
              styles.showtimeText,
              isSelected
                ? styles.selectedShowtimeText
                : styles.defaultShowtimeText,
            ]}
          >
            {item.time}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedShowtimes, styles, openSeatMap]
  );

  const renderCinemaItem = ({ item }: { item: Cinema }) => (
    <View style={styles.cinemaContainer}>
      <Text style={styles.cinemaName}>{item.cinema}</Text>
      <FlatList
        data={item.showtimes}
        horizontal
        renderItem={({ item }) =>
          renderShowtimeItem({ item, cinemaId: item.showID.toString() })
        }
        keyExtractor={(showtime, index) =>
          `${item.cinema}-${showtime.time}-${index}`
        }
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.flatListStyle}>
      <View>
        <FlatList
          data={dates}
          horizontal
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <DateItem
              item={item}
              isSelected={item.date === selectedDate}
              onPress={() => setSelectedDate(item.date)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
        />
      </View>
      <FlatList
        data={cinemaData}
        renderItem={renderCinemaItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CinemaList;
