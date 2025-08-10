import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

const Styles = () => StyleSheet.create({
    successText:{
        width: wp('90%'),
        height:hp('3.4%'),
        top:hp('23%'),
        fontFamily:"notoSans",
        fontSize: hp('2.5%'),
        textAlign:'center',
        color: "#4A148C",
        left:wp('6%')
    },
    successImg:{
        width:wp('100%'),
        height:hp('33%'),
        top:hp('30%')
    }
})
export default Styles;