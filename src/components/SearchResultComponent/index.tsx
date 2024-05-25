import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SearchResultTxtListComponent } from '../SearchResultTxtListComponent'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { SearchResultItemListComponent } from '../SearchResultItemListComponent'

type Props = {}

export const SearchResultComponent= (props: Props) => {
  return (
    <View>
      
      <SearchResultTxtListComponent />
      <View style={styles.searchResultItemContainer}> 
        <Text style={styles.headerTxt}>Showing Result for "ab"</Text>
        <SearchResultItemListComponent/>
      </View>
    </View>
  )
}
const styles= StyleSheet.create({
  
  searchResultItemContainer:{
    backgroundColor:COLORS.SKY_BLUE
  },
  headerTxt:{
    paddingVertical: responsiveHeight(10),
    fontWeight:'600',
    marginLeft: responsiveWidth(8),
    fontSize: respFontSize(13),
  }
})

