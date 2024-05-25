import { View, Text, Animated, PanResponder, Pressable, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { cancelIcon, coca_cola, right, share, timer } from "../../assets";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";
import { DeliveryFooter } from "../DeliveryFooter";
import { COLORS } from "../../constants";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeModal } from "../../redux/slices/cartModalSlice";
import { totalProductsList } from "../../utils/dataObjects";
import { addProduct, removeProduct } from "../../redux/slices/cartSlice";
import { CartProductList } from "../CartProductList";



type Props = {
    productListModal?: any,
    setProductListModal?: any
};

export const CartProductModal = ({ setProductListModal, productListModal }: Props) => {

    // useEffect(() => {
    //     console.log("Hello");
    // })
    const cart = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch();
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
                dispatch(closeModal());

            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false
                }).start();
            }
        }
    });
    useEffect(() => {
        if (cart.cartProduct.length === 0) {
            dispatch(closeModal());
        }
    }, [cart.cartProduct.length])
    return (
        <>
            <View style={[styles.modalView]}>
                <Animated.View style={[styles.container, { transform: [{ translateY: pan.y }] }]}
                    {...panResponder.panHandlers}
                >


                    <View style={styles.imageView}>
                        <Pressable onPress={() =>
                            dispatch(closeModal())

                        }>
                            <View style={styles.imageBGcontainer}>
                                <Image source={cancelIcon} style={styles.image} />
                            </View>
                        </Pressable>
                    </View>
                    <ScrollView style={{ marginTop: responsiveHeight(30) }} showsVerticalScrollIndicator={false} bounces={false}>

                        <CartProductList />

                    </ScrollView>




                    <View style={styles.footer}>
                        {
                            productListModal == true ? <DeliveryFooter productListModal={true} setProductListModal={setProductListModal} /> :
                                <DeliveryFooter />
                        }

                    </View>


                </Animated.View >
            </View >
            {/* <View style={{ flex: 1, backgroundColor: COLORS.BLACK }}></View> */}

        </>
    )
}
const styles = StyleSheet.create({

    modalView: {
        flex: 1,
        backgroundColor: COLORS.TRANSPARENT,

        // zIndex: 9999,

    },
    container: {
        // marginTop: responsiveHeight(120),
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        // backgroundColor: COLORS.WHITE,
        maxHeight: responsiveHeight(700),
        backgroundColor: COLORS.LIGHT_GREY,
        // height: screenHeight - responsiveHeight(120),
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

    footer: {
        // position: 'absolute',
        // bottom: 0,
        paddingBottom: responsiveHeight(20),
        backgroundColor: COLORS.WHITE,
        width: "100%"
    }
})

