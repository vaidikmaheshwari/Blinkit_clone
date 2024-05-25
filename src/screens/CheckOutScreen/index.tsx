import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { COLORS, ROUTE } from "../../constants";
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { BillDetails, CartProductList, CheckoutFooter, DeliveryFooter, ListHeader } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { useNavigation } from "@react-navigation/native";


type Props = {};

const CheckOutScreen = (props: Props) => {
    const cart = useAppSelector(state => state.cart.cartProduct);
    const navigation = useNavigation();
    useEffect(() => {
        if (cart.length == 0) {
            navigation.navigate(ROUTE.HOME as never);
        }
    }, [cart.length])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
                <ListHeader headerTxt="Checkout" rightImg={false} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLORS.SKY_BLUE, flex: 1 }}>

                    <CartProductList />
                    <BillDetails />
                </ScrollView>

                <CheckoutFooter />
            </View>
        </SafeAreaView>
    );
};

export default CheckOutScreen;
const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: "101%",
        paddingBottom:
            responsiveWidth(20),
        backgroundColor: COLORS.WHITE
    }
})
