import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { responsiveHeight, responsiveWidth, screenWidth } from '../../utils/responsiveFunctions';
import { COLORS, ROUTE } from '../../constants';
import { microphone, search } from '../../assets';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
type Props = {}

export const HomeSearchBar = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={{
      backgroundColor: COLORS.WHITE, paddingBottom: 8
    }}>


      <View style={styles.searchContainer}>
        <Pressable onPress={() => { navigation.navigate(ROUTE.SEARCH as never) }} >
          <View style={styles.searchView}>
            <View style={styles.iconLeftContainer}>
              <Image source={search} style={{ height: responsiveHeight(35), width: responsiveWidth(20) }} />
            </View>
            <View style={styles.inputContainer}>

              <Text style={styles.input}>Search Product</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.iconContainer}>

          <Image source={microphone} style={{ height: responsiveHeight(25), width: responsiveWidth(20) }} />
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.GREY,
    borderRadius: responsiveHeight(8),
    height: responsiveHeight(45),
    alignItems: 'center',
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(10),
    marginRight: responsiveWidth(10),
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(380),
  },
  iconLeftContainer: {
    marginLeft: responsiveWidth(10),
    marginTop: responsiveHeight(5)

  },
  iconContainer: {
    marginRight: responsiveWidth(10),

  },
  inputContainer: {
    flex: 1,
  },
  input: {
    paddingLeft: responsiveWidth(5),
    width: responsiveWidth(305),
    color: COLORS.LIGHT_PENCIL
  },
});

