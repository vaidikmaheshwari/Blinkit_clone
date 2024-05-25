import { View, Text, Image, StyleSheet, Pressable, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { delivery, downward, milk, rightArrow, upward } from '../../assets'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS, ROUTE } from '../../constants'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addProduct, removeProduct } from '../../redux/slices/cartSlice'
import { totalProductsList } from '../../utils/dataObjects'
import { CartProductModal } from '../CartProductModal'
import { closeModal, closeProductModal, toggleModal } from '../../redux/slices/cartModalSlice'
import { useNavigation } from '@react-navigation/native'



type Props = {
  productDetailModalVisible?: boolean;
  unit?: string;
  discountAvailable?: boolean;
  discountPrize?: string;
  actualPrize?: string;
  discountOff?: string;
  productDetailCard?: any;
  productOptionactiveIndex?: number;
  productListModal?: boolean;
  setProductListModal?: any

}

export const DeliveryFooter = ({ productDetailModalVisible, unit, discountAvailable, discountPrize, actualPrize, discountOff, productOptionactiveIndex, productDetailCard, productListModal, setProductListModal }: Props) => {

  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const cartProductModalVisible = useAppSelector(state => state.cartProductModal.cartProductModalVisible);
  return (
    <>
      <View style={styles.container}>

        <View style={styles.freeDeliveryContainer}>
          <View style={styles.imageContainer}>
            <Image source={delivery} style={styles.image} />
          </View>
          <View style={styles.deliveryTxtContainer}>
            <Text style={styles.freeDeliveryTxt}>Get FREE delivery</Text>
            {cart.cartProduct.length != 0 && cart.totalPrice > 299 ? <Text style={{ color: COLORS.LIGHT_PENCIL }}>yeah, you got a free delivery</Text> :

              <><Text style={{ color: COLORS.LIGHT_PENCIL }}>on shopping product worth ₹ 299</Text>
                {cart.cartProduct.length != 0 && cart.totalPrice < 299 &&
                  <View style={{ backgroundColor: COLORS.LIGHT_PENCIL, height: responsiveHeight(2), width: responsiveWidth(360), opacity: 0.3, marginTop: responsiveHeight(2) }}>
                    {
                      cart.totalPrice < 299 && <View style={{ position: 'absolute', backgroundColor: COLORS.DARK_BLUE, height: responsiveHeight(2), width: (cart.totalPrice / 300) * responsiveWidth(360), }}></View>
                    }

                  </View>
                }</>}
          </View>

        </View>
        {
          cart.cartProduct.length != 0 && productDetailModalVisible != true &&
          <View style={styles.deliveryItemsContainer}>
            <Pressable >
              <View style={styles.itemsContainer}>
                <View style={styles.itemImageContainer}>
                  <Image source={totalProductsList[cart.cartProduct[0].product_id - 1].photos[0]} style={styles.itemImage} />
                </View>
                <Pressable onPress={() => {
                  //  dispatch(toggleModal())
                  dispatch(toggleModal());
                  // console.log("hellofdfnodj");
                }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: respFontSize(12) }}>{cart.totalQuantity} ITEM</Text>
                    {
                      cartProductModalVisible ?
                        <Image source={downward} style={styles.upword} />
                        :
                        <Image source={upward} style={styles.upword} />
                    }
                  </View>

                </Pressable>

              </View>
            </Pressable>
            <Pressable onPress={() => {
              navigation.navigate(ROUTE.CHECKOUT as never)
              dispatch(closeModal());
              if (productListModal == true) {
                setProductListModal(false);
              }
            }}>
              <View style={styles.nxtBtnContainer}>
                <Text style={styles.nextTxt}>Next</Text>
                <Image source={rightArrow} style={styles.rightArrow} />
              </View>
            </Pressable>
          </View>
        }
        {
          productDetailModalVisible == true &&
          <View style={styles.deliveryItemsContainer}>

            <View style={styles.productitemsContainer}>

              <Text style={{ fontSize: respFontSize(11), fontWeight: '500' }}>{unit}</Text>
              {
                discountAvailable == true ? <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: respFontSize(11), fontWeight: '700' }}>₹{discountPrize}</Text>
                  <Text style={{ fontSize: respFontSize(11) }}> MRP </Text>
                  <Text style={{ fontSize: respFontSize(11), color: COLORS.LIGHT_PENCIL, textDecorationLine: 'line-through' }}>₹{actualPrize}</Text>
                  <View style={{ backgroundColor: COLORS.DARK_BLUE, borderRadius: responsiveHeight(6), padding: 2, paddingHorizontal: 5, marginLeft: 2 }}>
                    <Text style={{ color: COLORS.WHITE, fontSize: respFontSize(10) }}>{discountOff} off</Text>
                  </View>
                </View> : <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: respFontSize(11) }}>MRP </Text>
                  <Text style={{ fontSize: respFontSize(11), fontWeight: '700' }}>₹{actualPrize}</Text>
                </View>

              }

              <Text style={{ fontSize: respFontSize(8) }}>(inclusive of all taxes)</Text>

            </View>
            {cart.cartProduct.findIndex((p) => p.product_id === productDetailCard?.id && p.option_id === productDetailCard?.options[productOptionactiveIndex].optionId) != -1 ?

              <View style={[styles.cartContainer, { justifyContent: 'space-between', paddingHorizontal: responsiveWidth(8) },]}>
                <Pressable onPress={() =>
                  dispatch(removeProduct({
                    product_id: productDetailCard.id,
                    option_id: productDetailCard.options[productOptionactiveIndex].optionId,
                    quantity: 1,
                  }))
                }>
                  <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(16) }}>-</Text>
                </Pressable>
                <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(14) }}>{cart.cartProduct[cart.cartProduct.findIndex((p) => p.product_id == productDetailCard.id && p.option_id == productDetailCard.options[productOptionactiveIndex].optionId)].quantity}</Text>

                <Pressable onPress={() =>
                  dispatch(addProduct({
                    product_id: productDetailCard.id,
                    option_id: productDetailCard.options[productOptionactiveIndex].optionId,
                    quantity: 1,
                    price: discountAvailable ? discountPrize : actualPrize
                  }))

                }>
                  <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(16) }}>+</Text>
                </Pressable>
              </View> :
              < Pressable onPress={() => {

                dispatch(addProduct({
                  product_id: productDetailCard.id,
                  option_id: productDetailCard.options[productOptionactiveIndex].optionId,
                  quantity: 1,
                  price: discountAvailable ? discountPrize : actualPrize
                }))
              }} >
                <View style={styles.nxtBtnContainer}>
                  <Text style={styles.nextTxt}>Add to Cart</Text>

                </View>
              </Pressable>

            }

          </View>
        }
      </View >


    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
  },
  freeDeliveryContainer: {
    paddingVertical: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.SKY_BLUE
  },
  imageContainer: {
    marginLeft: responsiveWidth(8),
    backgroundColor: COLORS.WHITE,
    borderRadius: responsiveHeight(8),
  },
  image: {
    padding: 5,
    height: responsiveHeight(30),
    width: responsiveWidth(30),
    tintColor: COLORS.DARK_BLUE
  },
  deliveryTxtContainer: {
    marginLeft: responsiveWidth(10)
  },
  freeDeliveryTxt: {
    color: COLORS.DARK_BLUE,
    fontSize: respFontSize(10),

  },
  deliveryItemsContainer: {
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: responsiveHeight(8),
    //  paddingBottom:responsiveHeight(15),
  },
  itemsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: responsiveWidth(8),
  },
  productitemsContainer: {
    flexDirection: 'column',
    // alignItems:'center',
    paddingLeft: responsiveWidth(14),
  },
  itemImageContainer: {
    borderColor: COLORS.GREY,
    borderWidth: 1,
    borderRadius: responsiveHeight(8),
    marginRight: responsiveWidth(8),
  },
  itemImage: {
    margin: 4,
    width: responsiveWidth(25),
    height: responsiveHeight(25)
  },
  upword: {
    tintColor: COLORS.GREEN,
    width: responsiveWidth(20),
    height: responsiveHeight(20)
  },
  nxtBtnContainer: {
    backgroundColor: COLORS.GREEN,
    borderRadius: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(8),
    width: responsiveWidth(200),

    paddingVertical: responsiveHeight(10)
  },
  cartContainer: {
    backgroundColor: COLORS.GREEN,
    borderRadius: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(8),
    gap: 25,
    paddingVertical: responsiveHeight(10)
  },
  nextTxt: {
    color: COLORS.WHITE,
    fontSize: respFontSize(14),
    fontWeight: 'bold',

  },
  rightArrow: {
    tintColor: COLORS.WHITE,
    width: responsiveWidth(13),
    height: responsiveHeight(13),
    marginLeft: responsiveWidth(4),

  }


})

