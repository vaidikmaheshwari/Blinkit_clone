import { View, Text, ScrollView, Pressable, Image, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { BillDetails, ListHeader, OrderBillDetails, OrderDetailCard } from "../../components";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";
import { useRoute } from "@react-navigation/native";
import { useAppSelector } from "../../redux/hooks";
import { downloadIcon } from "../../assets";

type Props = {};

const OrderSummary = (props: Props) => {
    const route = useRoute();
    const id = route.params?.orderId;
    const orderBook = useAppSelector((state) => state.order.orderBook);
    console.log(orderBook);
    const deliveredProductIndex = orderBook.findIndex((p: any) => p.orderId === id);
    // console.log(deliveredProductIndex);
    function formatDate(dateString: any) {
        const options = {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

        return formattedDate;
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE, }}>
            <View style={{ flex: 1, backgroundColor: COLORS.WHITE, }}>
                <ListHeader rightImg={false} />
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ backgroundColor: COLORS.SKY_BLUE, marginBottom: 100 }}>
                    <View style={{ backgroundColor: COLORS.WHITE, paddingLeft: responsiveWidth(8) }}>
                        <Text style={styles.headerTxt}>Order Summary</Text>
                        <Text style={styles.lightTxt}>Arrived at 7:45 pm</Text>
                        <Pressable>
                            <View style={styles.invoiceContainer}>
                                <Text style={{ color: COLORS.GREEN, fontSize: respFontSize(11) }}>Download Invoice</Text>
                                <Image source={downloadIcon} style={styles.invoiceImg} />
                            </View>
                        </Pressable>
                    </View>
                    <View style={{
                        backgroundColor: COLORS.WHITE, paddingLeft: responsiveWidth(8), paddingTop: responsiveHeight(8)
                    }}>
                        <Text style={{ fontSize: respFontSize(13), fontWeight: '600' }}>{orderBook[deliveredProductIndex].cartProduct.length} item in this order</Text>
                        {
                            orderBook[deliveredProductIndex].cartProduct.map((item: any) =>
                                <View key={`${item.product_id} ${item.option_id}`}>
                                    <OrderDetailCard item={item} />
                                </View>)
                        }
                    </View>

                    <View style={{ marginTop: responsiveHeight(20), backgroundColor: COLORS.WHITE, }}>
                        <OrderBillDetails totalPrice={orderBook[deliveredProductIndex].totalPrice} />
                    </View>


                    <View style={{ marginTop: responsiveHeight(20), backgroundColor: COLORS.WHITE, paddingVertical: responsiveHeight(10), }}>
                        <Text style={{ fontWeight: "bold", fontSize: respFontSize(13), marginBottom: responsiveHeight(8), paddingLeft: responsiveWidth(8) }}>Order details</Text>
                        <View style={{ height: 1, backgroundColor: COLORS.PENCIL }}></View>

                        <View style={{ paddingTop: responsiveHeight(10), paddingLeft: responsiveWidth(8), paddingBottom: responsiveHeight(10) }}>
                            <Text style={{ color: COLORS.LIGHT_PENCIL, paddingBottom: responsiveHeight(5), fontSize: respFontSize(11) }}>Order id</Text>
                            <Text>{orderBook[deliveredProductIndex].orderId}</Text>
                        </View>

                        <View style={{ paddingTop: responsiveHeight(10), paddingLeft: responsiveWidth(8), paddingBottom: responsiveHeight(10) }}>
                            <Text style={{ color: COLORS.LIGHT_PENCIL, paddingBottom: responsiveHeight(5), fontSize: respFontSize(11) }}>Payment</Text>
                            <Text>{orderBook[deliveredProductIndex].paymentMode}</Text>
                        </View>

                        <View style={{ paddingTop: responsiveHeight(10), paddingLeft: responsiveWidth(8), paddingBottom: responsiveHeight(10) }}>
                            <Text style={{ color: COLORS.LIGHT_PENCIL, paddingBottom: responsiveHeight(5), fontSize: respFontSize(11) }}>Deliver to</Text>
                            <Text>910, innow8 apps </Text>
                        </View>

                        <View style={{ paddingTop: responsiveHeight(10), paddingLeft: responsiveWidth(8), paddingBottom: responsiveHeight(10) }}>
                            <Text style={{ color: COLORS.LIGHT_PENCIL, paddingBottom: responsiveHeight(5), fontSize: respFontSize(11) }}>Order placed</Text>
                            <Text>placed on {formatDate(orderBook[deliveredProductIndex].orderDate)}</Text>
                        </View>
                    </View>

                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: COLORS.WHITE, width: screenWidth, }}>
                    <Pressable style={{ backgroundColor: COLORS.GREEN, width: responsiveWidth(410), marginLeft: responsiveWidth(8), borderRadius: responsiveHeight(10) }}>
                        <View style={{ paddingVertical: responsiveHeight(5) }}>
                            <Text style={{ color: COLORS.WHITE, fontWeight: '600', textAlign: 'center', fontSize: respFontSize(13) }}>Repeat Order</Text>
                            <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontSize: respFontSize(12) }}>VIEW CART ON NEXT STEP</Text>
                        </View>
                    </Pressable>

                </View>

            </View>
        </SafeAreaView>
    );
};

export default OrderSummary;
const styles = StyleSheet.create({
    headerTxt: {
        fontWeight: 'bold',
        fontSize: respFontSize(18),
        marginBottom: responsiveHeight(8),
    },
    lightTxt: {
        color: COLORS.LIGHT_PENCIL,
    },
    invoiceContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        gap: 4,
        marginTop: responsiveHeight(8),
    },
    invoiceImg: {
        width: responsiveWidth(18),
        height: responsiveHeight(18),
        tintColor: COLORS.GREEN
    }
})
