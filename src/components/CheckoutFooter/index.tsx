import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { COLORS, ROUTE } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth, screenWidth } from "../../utils/responsiveFunctions";
import { delivery, downward, homeIcon, right, rightArrow, upward } from "../../assets";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { clearCart } from "../../redux/slices/cartSlice";
import { addOrder } from "../../redux/slices/orderSlice";
type Props = {};

export const CheckoutFooter = (props: Props) => {
    const totalPrice = useAppSelector(state => state.cart.totalPrice);
    const cart = useAppSelector(state => state.cart);
    const navigation = useNavigation();
    const showToast = () => {
        // console.log("Hello");
        Toast.show(
            {
                type: 'success',
                text1: 'Your Order is confirmed',
            }
        )
    }
    function generateRandomId(length: number) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let randomId = '';
        for (let i = 0; i < length; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return randomId;
    }

    const dispatch = useAppDispatch();
    return (
        <>
            {/* <Toast /> */}
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -responsiveWidth(10), justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View >
                            <Image source={homeIcon} style={{ tintColor: COLORS.YELLOW, width: responsiveWidth(40), height: responsiveHeight(80) }} />

                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Delivery to </Text>
                                <Text style={{ fontWeight: '600' }}>Home</Text>
                            </View>

                            <Text style={{ color: COLORS.LIGHT_PENCIL }}>910, Innow8 apps</Text>

                        </View>

                    </View>

                    <Pressable>
                        <Text style={{ color: COLORS.GREEN }}>Change</Text>
                    </Pressable>
                </View>


                <View style={styles.paymentContainer}>
                    <View >
                        <View style={{
                            flexDirection: 'row', alignItems: "center", gap: 3, paddingTop: responsiveHeight(8)

                        }}>
                            <Text style={{ color: COLORS.LIGHT_PENCIL, fontSize: respFontSize(10), }}>PAY USING</Text>
                            <Image source={upward} style={{ width: responsiveWidth(16), height: responsiveHeight(16), tintColor: COLORS.LIGHT_PENCIL }} />
                        </View>
                        <Text>Paytm UPI</Text>
                    </View>
                    <Pressable onPress={() => {
                        navigation.navigate(ROUTE.HOME as never)
                        // console.log("Hello");
                        console.log(new Date().toISOString())
                        dispatch(addOrder(
                            {
                                orderId: generateRandomId(8),
                                totalQuantity: cart.totalQuantity,
                                totalPrice: `${4 + 30 + cart.totalPrice}`,
                                orderDate: new Date().toISOString(),
                                orderStatus: 'Delivered',
                                deliveryTime: '4:45 PM',
                                paymentMode: 'Paid Online',
                                cartProduct: cart.cartProduct,
                            }
                        ))
                        dispatch(clearCart());
                        showToast();

                    }}>
                        <View style={{ backgroundColor: COLORS.GREEN, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: responsiveWidth(200), borderRadius: responsiveWidth(8), paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(6), paddingVertical: responsiveHeight(3) }}>
                            <View>
                                <Text style={{ color: COLORS.WHITE, fontWeight: '500' }}>₹{30 + 4 + totalPrice}</Text>
                                <Text style={{ color: COLORS.WHITE, fontWeight: '500' }}>TOTAL</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <Text style={{ color: COLORS.WHITE, fontWeight: '500' }}>Place order</Text>
                                <Image source={rightArrow} style={{ width: responsiveWidth(13), height: responsiveHeight(13), tintColor: COLORS.WHITE }} />
                            </View>

                        </View>
                    </Pressable>

                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: COLORS.WHITE,
        width: screenWidth,
        paddingHorizontal: responsiveWidth(14),
        borderTopLeftRadius: responsiveWidth(12),
        borderTopRightRadius: responsiveWidth(12),

    },
    paymentContainer: {
        borderTopWidth: 0.4,
        borderColor: COLORS.LIGHT_PENCIL,
        marginTop: -responsiveHeight(10),
        paddingHorizontal: responsiveWidth(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: responsiveHeight(8),

    }
})


