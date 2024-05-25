import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { totalItems } from "../../assets";
import { totalProductsList } from "../../utils/dataObjects";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";

type Props = {};

export const OrderDetailCard = ({ item }: any) => {
    console.log("ergr", item);
    return (
        <View style={styles.container}>
            <Image source={totalProductsList[item.product_id - 1].options[item.option_id - 1].photos[0]} style={{ width: responsiveWidth(90), height: responsiveHeight(90) }} />
            <View style={{ paddingLeft: responsiveWidth(8), paddingTop: responsiveHeight(8) }}>
                <Text style={{ width: '80%' }}>{totalProductsList[item.product_id - 1].productName}</Text>
                <View style={styles.unitPriceView}>
                    <Text style={{ fontSize: respFontSize(10), color: COLORS.LIGHT_PENCIL, }}>{totalProductsList[item.product_id - 1].options[item.option_id - 1].units} x {item.quantity}</Text>
                    <View style={styles.priceView}>
                        <Text style={{ textDecorationLine: 'line-through', color: COLORS.LIGHT_PENCIL, fontSize: respFontSize(10) }}>₹{totalProductsList[item.product_id - 1].options[item.option_id - 1].actualPrize}</Text>
                        <Text style={{ fontSize: respFontSize(10) }}>₹{item.price * item.quantity}</Text>
                    </View>
                </View>

            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(10),
        // paddingLeft: responsiveWidth(8)
    },
    unitPriceView: {
        paddingTop: responsiveWidth(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginRight: -responsiveWidth(10)

    }
})


