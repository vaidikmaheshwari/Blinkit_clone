import { View, Text, StyleSheet, Pressable, ScrollView, Image, Animated, PanResponder, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { DeliveryFooter } from '../DeliveryFooter'
import { SearchResultItemListComponent } from '../SearchResultItemListComponent'
import { cancelIcon, coca_cola, right, share, timer } from '../../assets'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { HomeFeature } from '../HomeFeature'


type ProductOption = {
  productName: string;
  photos: string[];
  discountPrize?: string; // Assuming this can be optional
  actualPrize: string;
  discountOff?: string; // Assuming this can be optional
  units: string;
  discountAvailable: boolean;
};

type ProductType = {
  id: number;
  deliveryTime: string;
  productName: string;
  photos: string[];
  discountAvailable: boolean;
  discountPrize: string;
  actualPrize: string;
  discountOff: string;
  units: string;
  companyName: string;
  optionsAvailable: boolean;
  options?: ProductOption[]; // Assuming options can be optional
  productDetail: string;
};
type Props = {
  productDetailData: ProductType | any,
  setProductDetailModalVisible: React.Dispatch<React.SetStateAction<boolean>>,

}
export const ProductDetailModal = ({ productDetailData, setProductDetailModalVisible, }: Props) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMore, setViewMore] = useState(true);
  const [activeOptionsIndex, setActiveOptionsIndex] = useState(0);
  const touchThreshold = 50;
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const { dx, dy } = gestureState;
      return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
    },
    onPanResponderMove: Animated.event(
      [
        null,
        { dy: pan.y }
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        setProductDetailModalVisible(false);
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();
      }
    }
  });
  return (
    <>
      <View style={[styles.modalView]}>
        <Animated.View style={[styles.container, { transform: [{ translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.imageView}>
            <Pressable onPress={() => setProductDetailModalVisible(false)}>
              <View style={styles.imageBGcontainer}>
                <Image source={cancelIcon} style={styles.image} />
              </View>
            </Pressable>
          </View>
          <ScrollView style={{ marginTop: responsiveHeight(30) }} showsVerticalScrollIndicator={false} bounces={false}>
            <View >
              <Carousel
                layout={"default"}
                ref={carouselRef}
                data={productDetailData.photos}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                renderItem={({ item, index }) => <Pressable style={{}} >
                  <Image source={item} style={styles.productImage} />
                </Pressable>}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={index => setActiveIndex(index)} />
              <Pagination
                dotsLength={productDetailData.photos.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={1}
              />
            </View>

            <View style={styles.headerView}>
              <View style={styles.headerTxtView}>
                <Text style={styles.headerTxt}>{productDetailData.productName}</Text>
                <View style={styles.deliveryTimeContainer}>
                  <Image source={timer} style={styles.timerImg} />
                  <Text style={styles.timeTxt}>{productDetailData.deliveryTime}</Text>
                </View>
              </View>
              <Pressable>
                <View style={styles.shareContainer}>
                  <Image source={share} style={styles.shareImg} />
                </View>
              </Pressable>
            </View>

            <Pressable>
              <View style={styles.line}></View>
              <View style={styles.companyContainer}>
                <View style={styles.companyImgView}>
                  <Image source={coca_cola} style={styles.companyImg} />
                </View>
                <View style={styles.companyTxtContainer}>
                  <View style={styles.companyTxtView}>
                    <Text style={styles.companyName}>{productDetailData.companyName}</Text>
                    <Text style={styles.explore}>Explore All Product</Text>
                  </View>
                  <View style={styles.rightArrowView}>
                    <Image source={right} style={styles.rightArrowImg} />
                  </View>
                </View>
              </View>
              <View style={styles.line}></View>
            </Pressable>

            {
              productDetailData.options.length > 0 ?
                <View style={styles.unitsContainer}>
                  <Text style={styles.selectUnitTxt}>Select Unit</Text>
                  <View style={styles.unitList}>
                    {productDetailData.options.map((unit: any, index: number) => {
                      return (
                        <TouchableOpacity key={unit.actualPrize} onPress={() => setActiveOptionsIndex(index)}>
                          <View style={[styles.unitContainer, { borderColor: index == activeOptionsIndex ? COLORS.GREEN : COLORS.BLACK, backgroundColor: index == activeOptionsIndex ? COLORS.LIGHT_GREEN : COLORS.WHITE, }]}>
                            {
                              unit.discountAvailable && <View style={styles.discountContainer}>
                                <Text style={styles.discountTxt}>{unit.discountOff} Off</Text>
                              </View>
                            }
                            <View>
                              <Text style={styles.unitTxt}>{unit.units}</Text>
                            </View>
                            <View style={styles.prizeView}>
                              {
                                unit.discountAvailable ? <><Text style={styles.priceText}>₹ {unit.discountPrize}</Text>
                                  <Text style={styles.oldPriceText}> ₹ {unit.actualPrize}</Text></> : <Text style={styles.priceText}>₹ {unit.actualPrize}</Text>
                              }
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })}
                  </View>
                </View>
                :
                <>
                  <View style={{ marginLeft: responsiveWidth(8) }}>
                    <Text>{productDetailData.units}</Text>
                    {
                      productDetailData.discountAvailable ? <><Text style={styles.priceText}>₹ {productDetailData.discountPrize}</Text>
                        <Text style={styles.oldPriceText}> ₹ {productDetailData.actualPrize}</Text></> : <Text style={styles.priceText}>₹ {productDetailData.actualPrize}</Text>
                    }
                  </View>
                  <View style={styles.line}></View>
                </>
            }

            <View style={[styles.unitsContainer, { marginRight: responsiveWidth(8) }]}>
              <Text style={styles.selectUnitTxt}>Product Details</Text>
              <Text style={styles.detailTxt}>
                {viewMore ? productDetailData.productDetail.slice(0, 55) + "..." : productDetailData.productDetail}
              </Text>
              <Pressable onPress={() => { setViewMore(!viewMore) }}>
                <Text style={styles.explore}>{viewMore ? "View more details" : "View less details"}</Text>
              </Pressable>
            </View>

            <View style={{ paddingTop: responsiveHeight(200) }}></View>
          </ScrollView>
          <View style={styles.footer}>
            <DeliveryFooter productDetailModalVisible={true}
              productDetailCard={productDetailData}
              productOptionactiveIndex={activeOptionsIndex}
              unit={productDetailData.options.length > 0 ? productDetailData.options[activeOptionsIndex].units :
                productDetailData.units}
              discountOff={productDetailData.options.length > 0 ? productDetailData.options[activeOptionsIndex].discountOff :
                productDetailData.discountOff}
              discountPrize={productDetailData.options.length > 0 ? productDetailData.options[activeOptionsIndex].discountPrize :
                productDetailData.discountPrize}
              actualPrize={productDetailData.options.length > 0 ? productDetailData.options[activeOptionsIndex].actualPrize :
                productDetailData.actualPrize}
              discountAvailable={productDetailData.options.length > 0 ? productDetailData.options[activeOptionsIndex].discountAvailable :
                productDetailData.discountAvailable} />
          </View>
        </Animated.View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({

  modalView: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,

  },
  container: {
    // height: responsiveHeight(800),
    marginTop: responsiveHeight(120),
    backgroundColor: COLORS.WHITE,
    height: screenHeight - responsiveHeight(120),
    borderTopLeftRadius: responsiveHeight(20),
    borderTopRightRadius: responsiveHeight(20),
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  imageView: {
    marginTop: -responsiveHeight(60),
  },
  imageBGcontainer: {
    backgroundColor: COLORS.BLACK,
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    borderRadius: responsiveHeight(25),
    marginLeft: responsiveWidth(190),
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    zIndex: 30,
    width: responsiveWidth(44),
    height: responsiveHeight(44),
    tintColor: COLORS.WHITE
  },
  productImage: {
    width: screenWidth,
    height: responsiveHeight(360),
  },
  paginationContainer: {
    marginTop: -responsiveHeight(20)
  },
  paginationDot: {
    backgroundColor: COLORS.BLACK,
  },
  headerView: {
    marginTop: -responsiveHeight(10),
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTxtView: {
    width: responsiveWidth(330),
  },
  headerTxt: {
    fontSize: respFontSize(18),
    fontWeight: '700'

  },
  deliveryTimeContainer: {
    backgroundColor: COLORS.PENCIL,
    width: responsiveWidth(70),
    flexDirection: 'row',
    //  flex:1,
    alignItems: 'center',
    gap: 2,
    borderRadius: responsiveHeight(8),
    padding: 2,
    marginTop: responsiveHeight(8),
  },
  timerImg: {
    width: responsiveWidth(12),
    height: responsiveHeight(12),
  },
  timeTxt: {
    fontSize: respFontSize(10),
    fontWeight: '500'
  },
  shareContainer: {
    borderWidth: 0.2,
    borderColor: COLORS.BLACK,
    padding: 6,
    borderRadius: 18,

  },
  shareImg: {
    width: responsiveWidth(15),
    height: responsiveHeight(15)
  },
  line: {
    height: 1,
    width: responsiveWidth(400),
    backgroundColor: COLORS.PENCIL,
    marginLeft: responsiveWidth(8),
    marginTop: responsiveHeight(8),
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(8),
    marginRight: responsiveHeight(8),
  },
  companyImgView: {

    borderColor: COLORS.BLACK,
    borderRadius: responsiveHeight(8)
  },
  companyImg: {
    width: responsiveWidth(35),
    borderRadius: responsiveHeight(8),
    height: responsiveHeight(35),
    marginRight: responsiveWidth(8),
  },
  companyTxtContainer: {
    marginTop: responsiveHeight(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  companyTxtView: {

  },
  companyName: {
    fontWeight: '500',

  },
  explore: {
    color: COLORS.GREEN,
    fontSize: respFontSize(10),
    marginTop: responsiveHeight(3),
  },
  rightArrowView: {
    width: responsiveWidth(20),
    height: responsiveHeight(20),
  },
  rightArrowImg: {
    width: responsiveWidth(20),
    height: responsiveHeight(20),
    marginLeft: responsiveWidth(220),
  },
  unitsContainer: {
    marginLeft: responsiveWidth(8),
  },
  selectUnitTxt: {
    fontWeight: '700',
    fontSize: respFontSize(15),
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(10)
  },
  unitList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: responsiveWidth(400),
    gap: 8
  },
  unitContainer: {
    borderWidth: 0.2,
    borderRadius: responsiveHeight(12),
    //  paddingHorizontal:responsiveWidth(12),
    height: responsiveHeight(60),
    width: responsiveWidth(90),
    alignItems: 'center',
    marginTop: responsiveHeight(8),
  },
  discountContainer: {
    position: 'absolute',
    marginTop: responsiveHeight(-10),
    backgroundColor: COLORS.BLUE,
    padding: 2,
    borderRadius: responsiveHeight(6),
  },
  discountTxt: {
    fontSize: respFontSize(10),
    color: COLORS.WHITE
  },
  unitTxt: {
    fontSize: respFontSize(10),
    marginTop: responsiveHeight(10),

  },
  prizeView: {
    flexDirection: 'row',
    marginTop: responsiveHeight(6),
  },
  priceText: {
    fontSize: respFontSize(11),
    fontWeight: '700'
  },
  oldPriceText: {
    fontSize: respFontSize(11),
    textDecorationLine: 'line-through',
    color: COLORS.LIGHT_PENCIL
  },
  detailTxt: {
    color: COLORS.LIGHT_PENCIL
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: responsiveHeight(20),
    backgroundColor: COLORS.WHITE,
    width: "100%"
  }
})

