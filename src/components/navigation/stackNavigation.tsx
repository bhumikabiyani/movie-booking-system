import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../../features/movieBooking/views/homePage";
import MovieDetails from "../../features/movieDetails";
import ArrowIcon from "../icons/arrowIcon";
import SuccessPage from "../movies/success";
import Ticket from "../bookedTicket";

const StackNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MoviesDetails"
        component={MovieDetails}
        options={{
          headerShown: false,
          headerLeft: () => <ArrowIcon />,
        }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookingTicket"
        component={Ticket}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
