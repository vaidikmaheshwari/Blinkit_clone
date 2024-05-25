import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

import { respFontSize, responsiveHeight, responsiveWidth, screenWidth } from '../../utils/responsiveFunctions'
import { storeByData } from '../../utils/dataObjects'

type Props = {}

export const HomeShopByStore = (props: Props) => {
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Shop by store</Text>
    <ScrollView 
     horizontal 
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={styles.scrollContainer} 
     
    >
      {storeByData.map((store) => {
        return (
          <View key={store.id} style={styles.storeContainer}>
            <Image
              source={{ uri: store.image }}
              alt={store.title}
              style={styles.image}
            />
            <Text style={styles.storeTitle}>{store.title}</Text>
          </View>
        );
      })}
    </ScrollView>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      marginBottom: responsiveHeight(16),
    },
    heading: {
      fontSize: respFontSize(17),
      fontWeight: 'bold',
      marginBottom: responsiveHeight(8),
      marginLeft:responsiveHeight(8)
    },
    scrollContainer: {
      paddingLeft: responsiveWidth(8),
      paddingRight: responsiveWidth(8),
      width:screenWidth*1.3,
      flexWrap:'wrap',
    },
    storeContainer: {
      marginRight: responsiveWidth(12),
      alignItems: 'center',
      marginBottom:responsiveHeight(10)
    },
    image: {
      width: responsiveWidth(90),
      height: responsiveHeight(90),
      borderRadius: responsiveHeight(8),
    },
    storeTitle: {
      textAlign: 'center',
    },
  });