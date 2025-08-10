// BookedTicket.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TicketListingScreen from "../../features/movieBooking/views/myBookings";
import Ticket from "../bookedTicket";

const BookedTicket = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Bookings">
      <Stack.Screen
        name="Bookings"
        component={TicketListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Ticket"
        component={Ticket}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookedTicket;
