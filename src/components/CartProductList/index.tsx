import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { timer } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { COLORS } from "../../constants";
import { addProduct, removeProduct } from "../../redux/slices/cartSlice";
import { totalProductsList } from "../../utils/dataObjects";

type Props = {};

export const CartProductList = (props: Props) => {
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch();
    return (
        <View >
            <View style={styles.mainContainer}>
                <View style={styles.headerView}>
                    <View style={styles.timerImgContainer}>
                        <Image source={timer} style={styles.timerImg} />
                    </View>
                    <View >
                        <Text style={styles.headerTxt}>Delivery in 13 minutes</Text>
                        <Text style={styles.headerDescriptionTxt}>Shipment of {cart.totalQuantity} items</Text>
                    </View>
                </View>

                {cart.cartProduct.map(item => {

                    return (
                        <View key={`${item.product_id} ${item.option_id}`} style={{ paddingBottom: responsiveHeight(24), borderTopWidth: 1, borderColor: COLORS.LIGHT_GREY }}>
                            <View style={styles.productView}>
                                <View style={{ flexDirection: 'row', gap: 4 }}>
                                    <Image source={totalProductsList[item.product_id - 1].photos[0]} style={styles.productImg} />
                                    <View style={styles.productTxtView}>
                                        <Text style={styles.productText}>
                                            {totalProductsList[item.product_id - 1].productName}
                                        </Text>
                                        <Text style={styles.headerDescriptionTxt}>{totalProductsList[item.product_id - 1].options[item.option_id - 1].units}</Text>

                                    </View>

                                </View>

                                <View>
                                    <View style={{ flexDirection: 'row', backgroundColor: COLORS.GREEN, paddingVertical: 3, justifyContent: 'space-between', alignItems: 'center', borderRadius: responsiveHeight(4), marginHorizontal: 4, width: responsiveWidth(70), paddingHorizontal: 5 }}>
                                        <Pressable onPress={() =>
                                            dispatch(removeProduct({
                                                product_id: item.product_id,
                                                option_id: item.option_id,
                                                quantity: 1,
                                            }))
                                        }

                                        >
                                            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(15) }}>-</Text>
                                        </Pressable>
                                        <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(13) }}>{item.quantity}</Text>

                                        <Pressable onPress={() =>
                                            dispatch(addProduct({
                                                product_id: item.product_id,
                                                option_id: item.option_id,
                                                quantity: 1,
                                                price: item.price
                                            }))
                                        }
                                        >
                                            <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', fontSize: respFontSize(15) }}>+</Text>
                                        </Pressable>
                                    </View>

                                    {
                                        totalProductsList[item.product_id - 1].options[item.option_id - 1].discountAvailable === true ?
                                            <View style={{ flexDirection: 'row', gap: 4 }}>
                                                <Text style={styles.oldPriceText}>₹ {totalProductsList[item.product_id - 1].options[item.option_id - 1].actualPrize}</Text>
                                                <Text style={styles.priceText}>₹ {item.price}</Text>

                                            </View>
                                            :

                                            <Text style={[styles.priceText, { textAlign: 'right', marginRight: responsiveWidth(8) }]}>₹ {item.price}</Text>
                                    }

                                </View>

                            </View>


                        </View>
                    )
                })}
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.WHITE,
        margin: responsiveWidth(12),
        borderRadius: responsiveHeight(8),
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: responsiveWidth(12),
        paddingVertical: responsiveHeight(12),
        gap: 8
    },
    timerImgContainer: {
        backgroundColor: COLORS.PENCIL,
        width: responsiveWidth(40),
        height: responsiveHeight(40),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: responsiveHeight(8),
        marginTop: responsiveHeight(8),
    },
    timerImg: {
        width: responsiveWidth(30),
        height: responsiveHeight(30),
    },
    headerTxt: {
        fontSize: respFontSize(16),
        fontWeight: 'bold',
    },
    headerDescriptionTxt: {
        fontSize: respFontSize(11),
        color: COLORS.LIGHT_PENCIL
    },
    productView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingTop: responsiveHeight(),
    },
    productImg: {
        width: responsiveWidth(80),
        height: responsiveHeight(80),
        borderRadius: responsiveWidth(8),
    },
    productTxtView: {
        paddingTop: responsiveHeight(16),
        width: responsiveWidth(200),
    },
    productText: {
        fontSize: respFontSize(14),
        fontWeight: '600'
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

})


