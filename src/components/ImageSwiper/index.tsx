import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ImageSwiperList } from '../../utils/dataObjects'
import { responsiveHeight, responsiveWidth, screenWidth } from '../../utils/responsiveFunctions'
import Carousel from 'react-native-snap-carousel';
import { COLORS } from '../../constants';
type Props = {}
const ITEM_WIDTH = screenWidth * 0.8;
// const ITEM_SPACING = (screenWidth - ITEM_WIDTH) / 2;
export const ImageSwiper = (props: Props) => {
 
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
 

  return (
    <View style={{marginBottom:responsiveHeight(16)}}>
       <Carousel
     
     layout={"default"}
      ref={carouselRef}
      data={ImageSwiperList}
      sliderWidth={screenWidth}
      itemWidth={ITEM_WIDTH }
      renderItem={({item,index})=><View style={{ width:responsiveWidth(360)}} >
          <Image
           source={ item.image }
           alt={item.title}
           style={styles.image}
           />
      </View>}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1} 
      loop
      autoplay
      autoplayInterval={5000} 
      onSnapToItem = { index => setActiveIndex(index) } />

    </View>
   
      
  )
}
const styles = StyleSheet.create({
    
   
    image: {
    
      width: responsiveWidth(320),
      height: responsiveHeight(220),
      borderRadius: responsiveHeight(8),
    },
  });
