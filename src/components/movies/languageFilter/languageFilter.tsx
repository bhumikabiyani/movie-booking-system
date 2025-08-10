import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Styles from "./style";
import { getAllMovies } from "../../../actions/getAllMovies";
const styles = Styles();

const languages = [
  "All",
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Kannada",
  "Bengali",
  "Marathi",
  "Punjabi",
  "Gujarati",
];

const LanguageFilter = () => {
  const [language, setLanguage] = React.useState("All");
  const dispatch = useDispatch();

  const handleLanguageChange = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    const language = selectedLanguage === "All" ? "" : selectedLanguage;
    dispatch(getAllMovies({ language }));
  };

  return (
    <FlatList
      horizontal
      data={languages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleLanguageChange(item)}>
          <Text
            style={[
              styles.title,
              language === item && styles.activeTitle
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default LanguageFilter;