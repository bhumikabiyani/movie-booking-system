import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieIcon from "./src/components/icons/movieIcon";
import SearchIcon from "./src/components/icons/searchIcon";
import MyBookingIcon from "./src/components/icons/myBookings";
import ProfileIcon from "./src/components/icons/profileIcon";
import StackNavigation from "./src/components/navigation/stackNavigation";
import Account from "./src/features/movieBooking/views/account";
import SearchStackNavigation from "./src/components/navigation/searchNavigation";
import BookedTicket from "./src/components/navigation/bookedTicketNavigation.tsx";
import { Provider } from "react-redux";
import RootStore from "./src/store/rootStore.ts";

const App: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Provider store={RootStore}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              switch (route.name) {
                case "Movies":
                  return <MovieIcon color={color} />;
                case "Search":
                  return <SearchIcon color={color} />;
                case "My Bookings":
                  return <MyBookingIcon color={color} />;
                case "Account":
                  return <ProfileIcon color={color} />;
                default:
                  return null;
              }
            },
            tabBarInactiveTintColor: "#000",
            tabBarActiveTintColor: "#6A1B9A",
          })}
        >
          <Tab.Screen name="Movies" component={StackNavigation} />
          <Tab.Screen name="Search" component={SearchStackNavigation} />
          <Tab.Screen name="My Bookings" component={BookedTicket} />
          <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
