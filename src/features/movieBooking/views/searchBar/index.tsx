import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Styles from "./style";
import MovieListScreen from "./movieListing";
import TheatreListScreen from "./theatreListing";
import SearchBar from "react-native-dynamic-search-bar";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
const Tab = createMaterialTopTabNavigator();

const Search = () => {
  const [searchText, setSearchText] = useState("");

  const styles = Styles();

  return (
    <SafeAreaView >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search here"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            onClearPress={() => setSearchText("")}
            style={styles.searchBar}
          />
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: "bold", marginTop: wp('2.7%') },
            tabBarIndicatorStyle: { backgroundColor: "#6A1B9A" },
            tabBarActiveTintColor: "#6A1B9A",
            tabBarInactiveTintColor: "black",
          }}
        >
          
          <Tab.Screen name="Movies">
            {({ navigation }) => (
              <MovieListScreen
                searchText={searchText}
                navigation={navigation}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Theatres">
            {({ navigation }) => (
              <TheatreListScreen
                searchText={searchText}
                navigation={navigation}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default Search;
