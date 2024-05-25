import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { productList } from '../../utils/dataObjects';
import { timer } from '../../assets';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProduct, removeProduct } from '../../redux/slices/cartSlice';

type Photo = any;
interface Product {
  id: number;
  name: string;
  quantity: string;
  price: string;
  photos: Photo[];
  itemDetails: string;
}
interface Category {
  product: {
    id: number;
    totalProducts: number;
    name: string;
    products: Product[];
  }

}

export const HorizontalProductCard = ({ product }: Category) => {
  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector(state => state.cart.cartProduct)
  return (
    <View style={{ width: responsiveWidth(370) }}>
      <View style={styles.headerView}>
        <Text style={styles.headerTxt}>{product.name}</Text>
        <Pressable ><Text style={styles.btnTxt}>see all</Text></Pressable>
      </View>
      {
        productList.slice(0, 3).map((item) =>
          <View style={styles.mainContainer} key={item.id}>
            <TouchableOpacity

            >
              <View style={styles.imageContainer}>
                <Image
                  source={item.photos[0]}
                  alt={item.productName}
                  style={styles.image}
                />
                {
                  item.discountAvailable && <View style={styles.discountContainer}><Text style={styles.discountTxt}>{item.discountOff} OFF</Text></View>
                }

              </View>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <View style={styles.timeContainer}>

                <Image source={timer} style={{ height: responsiveHeight(10), width: responsiveWidth(10) }} />
                <Text style={styles.timeText}>{item.deliveryTime}</Text>
              </View>
              <Text style={styles.nameText}>{`${item.productName.substring(0, 60)} ${item.productName.length > 25 ? "" : "..."}`}</Text>
              <Text style={styles.weightText}>{item.units} </Text>
              <View style={styles.priceContainer}>
                <View>
                  {
                    item.discountAvailable ? <><Text style={styles.priceText}>₹ {item.discountPrize}</Text>
                      <Text style={styles.oldPriceText}>₹ {item.actualPrize}</Text></> : <Text style={styles.priceText}>₹ {item.actualPrize}</Text>
                  }

                </View>
                {
                  cartProduct.findIndex((p) => p.product_id == item.id && p.option_id == item.options[0].optionId) == -1 ? <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => dispatch(addProduct(
                      {
                        product_id: item.id,
                        option_id: item.options[0].optionId,
                        quantity: 1,
                        price: item.discountAvailable ? item.discountPrize : item.actualPrize
                      }
                    ))}
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

              </View>
            </View>
          </View>
        )
      }

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(14),
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(8),
    marginBottom: responsiveHeight(12),
  },
  headerTxt: {
    fontSize: respFontSize(14),
    fontWeight: 'bold',
  },
  btnTxt: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(8),
    paddingLeft: responsiveWidth(8),
  },
  imageContainer: {
    borderWidth: responsiveWidth(1),
    borderColor: COLORS.LIGHT_GREY,
    borderRadius: responsiveHeight(10),
    padding: 2,
    marginBottom: responsiveHeight(3),
  },
  image: {
    width: responsiveWidth(130),
    height: responsiveHeight(130),
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
    marginLeft: responsiveWidth(8),
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
    width: responsiveWidth(200),
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
    paddingVertical: responsiveHeight(5)
  },
  addText: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },

})

