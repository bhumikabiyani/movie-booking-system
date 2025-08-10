import * as React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getAllTheatres } from "../../../actions/getAllTheatres";

const cities = [
  { label: "Bangalore", value: "Bangalore" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Chennai", value: "Chennai" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Pune", value: "Pune" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Surat", value: "Surat" },
];

function DropDownIcon() {
  const [selectedCity, setSelectedCity] = React.useState("");
  const dispatch = useDispatch();

  const handleCityChange = (item: any) => {
    setSelectedCity(item.value);
    dispatch(getAllTheatres({ location: item.value }));
  };

  const renderItem = (item: any) => {
    return (
      <View style={style.item}>
        <Text style={style.text}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={style.container}
      containerStyle={style.dropDown}
      data={cities}
      labelField={"label"}
      valueField={"value"}
      onChange={handleCityChange}
      dropdownPosition="auto"
      value={selectedCity}
      search
      searchPlaceholder="Search"
      autoScroll={false}
      renderItem={renderItem}
      itemTextStyle={style.text}
      searchPlaceholderTextColor="black"
      placeholderStyle={style.text} 
      inputSearchStyle={style.text}
    />
  );
}

export default DropDownIcon;

const style = StyleSheet.create({
  dropDown: {
    width: wp("80%"),
    backgroundColor: "white",
  },
  container: {
    width: wp("30%"),
    height: hp("6%"),
  },
  item: {
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("3%"),
  },
  text: {
    fontSize: wp("4%"),
    color: "black",
    alignItems: "center",
  },
});
