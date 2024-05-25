import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { useAppSelector } from "../../redux/hooks";
import { delivery, shopping, totalItems } from "../../assets";

type Props = {};
const txtComponent = (txt: string, img: any, totalPrize: number, discountPrize?: number,) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: responsiveHeight(8) }}>
            <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                <Image source={img} style={styles.img} />
                <Text>{txt}</Text>

            </View>
            <View style={{ flexDirection: 'row', gap: 4 }}>
                {discountPrize ? <>
                    <Text style={{ textDecorationLine: 'line-through', color: COLORS.LIGHT_PENCIL, fontSize: respFontSize(11) }}>₹ {discountPrize}</Text>
                    <Text style={{ fontSize: respFontSize(11) }}>₹ {totalPrize}</Text></> : <Text style={{ fontSize: respFontSize(11) }}>₹ {totalPrize}</Text>
                }


            </View>

        </View>

    )
}
export const BillDetails = (props: Props) => {
    const cart = useAppSelector(state => state.cart)
    return (
        <View style={styles.container}>
            <Text style={styles.headerTxt}>Bill Details</Text>
            {txtComponent(
                txt = 'Item total',
                img = totalItems,
                totalPrize = cart.totalPrice,

            )}
            {txtComponent(
                txt = 'Delivery charge',
                img = delivery,
                totalPrize = 30,

            )}
            {txtComponent(
                txt = 'Handling charge',
                img = shopping,
                totalPrize = 4,

            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: respFontSize(13), fontWeight: '500' }}>Grand Total</Text>
                <Text style={{ fontSize: respFontSize(13), fontWeight: '500' }}>₹{30 + 4 + cart.totalPrice}</Text>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        marginHorizontal: responsiveWidth(11),
        borderRadius: responsiveHeight(10),
        paddingHorizontal: responsiveWidth(10),
        paddingVertical: responsiveHeight(15),
    },
    headerTxt: {
        fontWeight: "bold",
        fontSize: respFontSize(13),
        marginBottom: responsiveHeight(8),
    },
    img: {
        width: responsiveWidth(20),
        height: responsiveHeight(20),
    },
})