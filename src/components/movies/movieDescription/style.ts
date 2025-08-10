import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const useStyles = () =>
  StyleSheet.create({
    descriptionContainer: {
      fontWeight: '400',
      marginTop: hp('1%'), 
      lineHeight: hp('2.25%'), 
      paddingRight: wp('5.33%'), 
      maxWidth: wp('80%'),
      flexShrink: 1,
      fontSize: wp('3.1%'),
      color: '#14171A',
      fontFamily: 'notoSans',
    },
    container: {
      padding: wp('5.33%'), 
      flexWrap: 'wrap',
      width: '100%',
    },
    title: {
      fontSize: wp('4%'), 
      lineHeight: hp('3%'), 
      color: '#14171A',
      fontFamily: 'notoSans',
      maxWidth: wp('70%'),
    },
    caption: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp('2.13%'), 
    },
    captionText: {
      fontWeight: '400',
      fontSize: wp('3.1%'), 
      lineHeight: hp('2.25%'), 
      color: '#14171A',
      fontFamily: 'notoSans',
      flexShrink: 1,
      overflow: 'hidden'
    },
    address:{
      fontWeight: '400',
      fontSize: wp('3.1%'), 
      lineHeight: hp('2.25%'), 
      fontFamily: 'notoSans',
      color: '#14171A',
      // flexShrink: 1,
      marginTop: hp('1%'),
      // overflow: 'hidden'
    },
    rating: {
      paddingLeft: wp('1.65%'),
      paddingRight: wp('1.65%'),
      borderRadius: hp('0.5%'),
      fontFamily: 'Inter',
      fontWeight: '700',
      fontSize: hp('1.5%'),
      letterSpacing: 0.21,
      color: '#3C444D',
      backgroundColor: '#E9ECF0',
      borderBottomLeftRadius: hp('0.5%'),
    },
    summary: {
      fontFamily: 'notoSans',
      color: '#706E6B',
      fontSize: wp('3.2%'), 
      lineHeight: hp('2%'), 
    },
  });

export default useStyles;