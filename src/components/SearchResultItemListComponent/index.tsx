import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { productList } from '../../utils/dataObjects'
import { LargeProductCard } from '../LargeProductCard'
import { responsiveWidth } from '../../utils/responsiveFunctions'

type Props = {}

export const SearchResultItemListComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      {
        productList.map((item) =>
          <View key={item.id}>
            <LargeProductCard item={item} width={responsiveWidth(190)} />
          </View>
        )
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: responsiveWidth(8),
    // justifyContent: 'space-between',
    // marginRight: responsiveWidth(8),
  }
})
