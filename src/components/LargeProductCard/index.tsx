import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions';
import { COLORS } from '../../constants';
import { timer } from '../../assets';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ProductDetailModal } from '../ProductDetailModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProduct, removeProduct } from '../../redux/slices/cartSlice';


export const LargeProductCard = ({ item, width }: any) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [productDetailModalVisible, setProductDetailModalVisible] = useState(false)
  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector((state) => state.cart.cartProduct);


  return (
    <>
      <View style={styles.container} >
        <View style={styles.imageContainer}>
          <Carousel
            layout={"default"}
            ref={carouselRef}
            data={item.photos}
            itemHeight={responsiveHeight(190)}
            sliderWidth={width}
            itemWidth={width}
            renderItem={({ item, index }: any) =>
              <Image
                source={item}
                style={[styles.image, { width: width }]}
              />
            }
            //    autoplay
            //    autoplayInterval={2000}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            onSnapToItem={index => setActiveIndex(index)} />
          {
            item.discountAvailable && <View style={styles.discountContainer}><Text style={styles.discountTxt}>{item.discountOff} OFF</Text></View>
          }
          <Pagination
            dotsLength={item.photos.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.timeContainer}>

            <Image source={timer} style={{ height: responsiveHeight(10), width: responsiveWidth(10) }} />
            <Text style={styles.timeText}>{item.deliveryTime}</Text>
          </View>
          <TouchableOpacity onPress={() => { setProductDetailModalVisible(true) }}>
            <Text style={[styles.nameText, { width: width }]}>{`${item.productName.substring(0, 50)} ${item.productName.length > 50 ? "..." : ""}`}</Text>
          </TouchableOpacity>
          <Text style={styles.weightText}>{item.units} </Text>
          <View style={styles.priceContainer}>
            <View>
              {
                item.discountAvailable ? <><Text style={styles.priceText}>₹ {item.discountPrize}</Text>
                  <Text style={styles.oldPriceText}>₹ {item.actualPrize}</Text></> : <Text style={styles.priceText}>₹ {item.actualPrize}</Text>
              }

            </View >
            {
              cartProduct.findIndex((p) => p.product_id == item.id && p.option_id == item.options[0].optionId) == -1 ? <TouchableOpacity
                style={styles.addButton}
                onPress={() =>
                  dispatch(addProduct({
                    product_id: item.id,
                    option_id: item.options[0].optionId,
                    quantity: 1,
                    price: item.discountAvailable ? item.discountPrize : item.actualPrize
                  }))
                }
              >
                <Text style={styles.addText}>ADD</Text>
              </TouchableOpacity> :
                <View style={{ flexDirection: 'row', backgroundColor: COLORS.GREEN, paddingVertical: 3, justifyContent: 'space-between', alignItems: 'center', borderRadius: responsiveHeight(4), marginHorizontal: 4, width: responsiveWidth(50), paddingHorizontal: 3 }}>
                  <Pressable onPress={() =>
                    dispatch(removeProduct({
                      product_id: item.id,
                      option_id: item.options[0].optionId,
                      quantity: 1,
                    }))
                  }

                  >
                    <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(15) }}>-</Text>
                  </Pressable>
                  <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(13) }}>{cartProduct[cartProduct.findIndex((p) => p.product_id == item.id && p.option_id == item.options[0].optionId)].quantity}</Text>

                  <Pressable onPress={() =>
                    dispatch(addProduct({
                      product_id: item.id,
                      option_id: item.options[0].optionId,
                      quantity: 1,
                      price: item.discountAvailable ? item.discountPrize : item.actualPrize
                    }))
                  }
                  >
                    <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(15) }}>+</Text>
                  </Pressable>
                </View>
            }
            {/* <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                dispatch(addProduct({
                  product_id: item.id,
                  option_id: item.options[0].optionId,
                  quantity: 1,
                  price: item.discountAvailable ? item.discountPrize : item.actualPrize
                }))
              }
            >
              <Text style={styles.addText}>ADD</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View >

      <Modal
        //  animationType="slide"

        transparent={true}
        visible={productDetailModalVisible}
        onRequestClose={() => {
          setProductDetailModalVisible(false);
        }}>
        {<ProductDetailModal productDetailData={item} setProductDetailModalVisible={setProductDetailModalVisible} />}
      </Modal>

    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: responsiveHeight(8),
    marginLeft: responsiveWidth(8),
    backgroundColor: COLORS.WHITE,
    borderRadius: responsiveHeight(10),
  },
  imageContainer: {
    //   borderWidth: responsiveWidth(1),
    //   borderColor: COLORS.LIGHT_GREY,
    height: responsiveHeight(190),

    borderRadius: responsiveHeight(10),
    padding: 2,
    marginBottom: responsiveHeight(3),
  },
  image: {
    // width: responsiveWidth(190),
    height: responsiveHeight(190),
  },
  paginationContainer: {
    width: responsiveWidth(8),
    bottom: -responsiveHeight(33),
    right: responsiveWidth(4),
    position: 'absolute',
    gap: -responsiveWidth(8)
  },
  paginationDot: {
    height: responsiveHeight(6),
    width: responsiveWidth(6),
    borderRadius: responsiveHeight(3),
    backgroundColor: COLORS.LIGHT_PENCIL,
  },
  discountContainer: {
    backgroundColor: COLORS.BLUE,
    position: 'absolute',
    width: responsiveWidth(30),

    marginLeft: responsiveWidth(12),

  },
  discountTxt: {
    color: COLORS.WHITE,
    fontWeight: 'bold',
    fontSize: respFontSize(9),
    padding: 2,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PENCIL,
    width: responsiveWidth(60),
    padding: 2,
    borderRadius: responsiveHeight(5),
  },
  timeText: {
    padding: 2,
    fontSize: respFontSize(8),
    marginLeft: responsiveWidth(2),
  },
  nameText: {
    fontSize: respFontSize(13),
    fontWeight: '500',
    // width: responsiveWidth(190),
  },
  weightText: {
    color: COLORS.LIGHT_PENCIL,
    fontSize: respFontSize(11),
    marginVertical: responsiveHeight(7),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveHeight(8),

  },
  priceText: {
    fontSize: respFontSize(13),
    fontWeight: '500',
  },
  oldPriceText: {
    textDecorationLine: 'line-through',
    color: COLORS.LIGHT_PENCIL,
  },
  addButton: {
    borderWidth: responsiveHeight(1),
    borderColor: COLORS.GREEN,
    borderRadius: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(5),
    marginRight: responsiveWidth(8),
  },
  addText: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
});

