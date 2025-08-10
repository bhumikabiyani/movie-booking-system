import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MovieDetails from "../../features/movieDetails";
import ArrowIcon from "../icons/arrowIcon";
import Search from "../../features/movieBooking/views/searchBar";

const SearchStackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MoviesScreen"
        component={MovieDetails}
        options={{
          headerShown: false,
          headerLeft: () => <ArrowIcon />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchStackNavigation;
