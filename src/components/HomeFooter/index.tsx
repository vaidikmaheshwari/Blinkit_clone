import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'

type Props = {}

export const HomeFooter = (props: Props) => {
  return (
    <View style={{ backgroundColor: COLORS.GREY, }}>
      <Text style={{ fontSize: respFontSize(40), color: COLORS.DARKGREY, fontWeight: 'bold', width: responsiveWidth(340), marginLeft: responsiveWidth(8), marginTop: responsiveHeight(40) }}>India's last minute app ❤️</Text>
      <View style={{ backgroundColor: COLORS.DARKGREY, height: responsiveHeight(1), width: responsiveWidth(390), marginLeft: responsiveWidth(8), marginVertical: responsiveHeight(20) }}></View>
      <Text style={{ fontSize: respFontSize(20), color: COLORS.DARKGREY, fontWeight: 'bold', marginLeft: responsiveWidth(8), paddingBottom: responsiveHeight(50) }}>blinkit</Text>
    </View>
  )
}
