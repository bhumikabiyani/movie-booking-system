import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import Success from "../../icons/success";
import Styles from "./style";

const styles = Styles();

const SuccessPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = (route.params as { id: number });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigation.dispatch(StackActions.replace("BookingTicket", { id }));
    }, 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [id, navigation]);

  return (
    <View>
      <Text style={styles.successText}>Ticket Booked Successfully!</Text>
      <View style={styles.successImg}>
        <Success />
      </View>
    </View>
  );
};

export default SuccessPage;