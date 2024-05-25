import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { searchResultTextList } from '../../utils/dataObjects'
import { search } from '../../assets'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'

type Props = {}

export const SearchResultTxtListComponent = (props: Props) => {

  const renderHighlightedText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Text key={index} style={styles.highlightedText}>
              {part}
            </Text>
          ) : (
            <Text key={index} style={styles.normalTxt}>{part}</Text>
          )
        )}
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      {
        searchResultTextList.map((item, index) =>
          <View key={index} style={styles.itemView}>
            <View style={styles.imageView}>
              <Image source={search} style={{ width: responsiveWidth(25), height: responsiveHeight(25) }} />
            </View>

            {renderHighlightedText(item, 'ab')}
          </View>)
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(12),
    marginLeft: responsiveWidth(8),
  },

  itemView: {
    flexDirection: 'row',
    marginRight: responsiveHeight(8),
    marginBottom: responsiveHeight(14),
  },
  imageView: {
    borderRadius: responsiveHeight(8),
    borderWidth: 0.2,
    borderColor: COLORS.LIGHT_PENCIL,
    marginRight: responsiveHeight(8),
  },
  item: {

  },
  highlightedText: {
    color: COLORS.LIGHT_PENCIL,
    fontSize: respFontSize(13),
    fontWeight: '500',

  },
  normalTxt: {
    fontSize: respFontSize(13),
    fontWeight: '500',

  }
})
