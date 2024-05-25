import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS, ROUTE } from "../../constants";
import { coca_cola, rightImg, rightInd, rightSymbol } from "../../assets";
import { totalProductsList } from "../../utils/dataObjects";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export const OrderCard = ({ item }: any

) => {
    const navigation = useNavigation();
    // console.log(item)
    const [date, setDate] = useState<string>();
    useEffect(() => {
        const formatted = () => {
            const indianDateTime = new Date(item.orderDate);
            const dateOptions = { month: 'short', day: '2-digit' };
            const indianDateFormatted = indianDateTime.toLocaleString('en-IN', dateOptions);
            const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
            const indianTimeFormatted = indianDateTime.toLocaleString('en-IN', timeOptions);

            setDate(indianDateFormatted + ', ' + indianTimeFormatted);
        }
        formatted();

    }, [])


    return (
        <View style={styles.container} key={item.orderId} >
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <View style={styles.rightContainer} >
                        <Image source={rightSymbol} style={styles.rightImg} />
                    </View>
                    <View>
                        <Text style={{ fontSize: respFontSize(16), fontWeight: '600' }}>Delivered in 16 minutes </Text>
                        <Text style={{ fontSize: respFontSize(10), color: COLORS.LIGHT_PENCIL }}>₹{item.totalPrice} • {date}</Text>
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate(ROUTE.ORDERSUMMARY as never, { orderId: item.orderId })}>
                    <Image source={rightInd} style={styles.rightInd} />
                </Pressable>

            </View>
            <View style={styles.line}></View>
            <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                {
                    item.cartProduct.map((p: any, index: number) => <View key={index} style={{}}>
                        <Image source={totalProductsList[p.product_id - 1].options[p.option_id - 1].photos[0]} style={styles.productImg} />
                    </View>)
                }
                {/* <Image source={totalProductsList[item.cartProduct[0].product_id - 1].options[item.cartProduct[0].option_id - 1].photos[0]} style={styles.productImg} /> */}
            </View>
            <View style={styles.line}></View>
            <View style={styles.bottomContainer}>
                <Pressable style={styles.bottombtn}>
                    <Text style={{
                        textAlign: 'center',
                        color: COLORS.GREEN
                    }}>Reorder</Text>
                </Pressable>
                <Pressable style={styles.bottombtn}>
                    <Text style={{
                        textAlign: 'center',
                        color: COLORS.GREEN
                    }}>Rate order</Text>
                </Pressable>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginHorizontal: responsiveWidth(10),
        backgroundColor: COLORS.WHITE,
        borderRadius: responsiveWidth(10),
        // height: responsiveHeight(300),
        marginVertical: responsiveHeight(10),
        paddingTop: responsiveHeight(20),


    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(8),
        justifyContent: 'space-between',
    },
    rightContainer: {
        backgroundColor: COLORS.SEAGREEN,
        borderRadius: responsiveHeight(15),
        padding: 10,
    },
    rightImg: {
        tintColor: COLORS.GREEN,
        width: responsiveWidth(25),
        height: responsiveHeight(25),

    },
    rightInd: {
        width: responsiveWidth(20),
        height: responsiveHeight(20),
        tintColor: COLORS.LIGHT_PENCIL
    },
    line: {
        height: 1,
        marginTop: responsiveHeight(20),
        backgroundColor: COLORS.PENCIL,
    },
    productImg: {
        width: responsiveWidth(80),
        height: responsiveHeight(80),
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    bottombtn: {
        borderRightWidth: 1,
        width: "50%",
        borderRightColor: COLORS.PENCIL,
        paddingVertical: responsiveHeight(15)
    }

})

