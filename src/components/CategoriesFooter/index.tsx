import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { fruits } from '../../assets'
import { COLORS, ROUTE } from '../../constants'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'

type Props = {}

export const CategoriesFooter = (props: Props) => {
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTE.CATEGORIES as never)}>

      <Carousel

        layout={"default"}
        ref={carouselRef}
        data={['', '', '']}
        sliderWidth={responsiveWidth(80)}
        itemWidth={responsiveWidth(65)}
        renderItem={({ item, index }) => <View style={{ width: responsiveWidth(360) }} >
          <Image
            source={fruits}

            style={styles.image}
          />
        </View>}
        inactiveSlideScale={0.5}
        inactiveSlideOpacity={0.8}

        loop
        autoplay
        autoplayInterval={3000}
        onSnapToItem={index => setActiveIndex(index)} />
      <Text style={styles.txt}>CATEGORIES</Text>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLORS.BLACK,
    width: responsiveWidth(80),
    height: responsiveWidth(80),
    borderRadius: responsiveWidth(40),
    zIndex: 100,
    marginTop: -responsiveHeight(100),
    flex: 1,
    alignItems: 'center',
    marginLeft: responsiveWidth(330),
  },
  image: {
    width: responsiveWidth(65),
    height: responsiveHeight(55),
    marginTop: responsiveHeight(8),
  },
  txt: {
    color: COLORS.WHITE,
    fontWeight: '900',
    paddingBottom: responsiveHeight(10),
    fontSize: respFontSize(5),
  }
})

