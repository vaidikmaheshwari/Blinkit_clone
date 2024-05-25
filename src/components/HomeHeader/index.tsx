
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import React, { useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS, ROUTE } from '../../constants';
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions';

import { user } from '../../assets';
import { HomeSearchBar } from '../HomeSearchBar';
import { useNavigation } from '@react-navigation/native';

type Props = {

}

export const HomeHeader = ({ }: Props) => {
  const navigation = useNavigation();
  return (
    <View >
      <View style={styles.container}>

        <View style={[styles.deliveryInfo]}>
          <View style={styles.deliveryDetails}>
            <Text style={styles.deliveryHeaderText}>Delivery In</Text>
            <Text style={styles.deliveryTime}>8 minutes</Text>
            <Text style={styles.deliveryAddress}>910, Innow8 Apps </Text>
          </View>
          <TouchableOpacity onPress={() => { navigation.navigate(ROUTE.PROFILE as never) }}>
            {/* <Icon name="account-circle-outline" size={responsiveHeight(45)} color={COLORS.BLACK} /> */}
            <Image source={user} style={{ height: responsiveHeight(45), width: responsiveWidth(45) }} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {/* <HomeSearchBar /> */}
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
    // marginBottom: responsiveHeight(60),
  },

  deliveryHeaderText: {
    fontSize: respFontSize(10),
    fontWeight: 'bold',
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
  },
  deliveryDetails: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  deliveryTime: {
    fontSize: respFontSize(24),
    fontWeight: 'bold',
  },
  deliveryAddress: {
    fontSize: respFontSize(12),
  },
  searchBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1, // Add elevation for Android
    backgroundColor: 'white',
    paddingTop: 20, // Adjust this value according to your UI
    paddingHorizontal: 10,
  },
  // Add styles for SearchBar component if needed
});

