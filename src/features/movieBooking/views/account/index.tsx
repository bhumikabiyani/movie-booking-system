import {Text, View } from "react-native";
import React from "react";
import Styles from "./style";

const styles = Styles();

export default function Account() {
  return (
    <View style={styles.container}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
}