import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { ListHeader, OrderCard } from "../../components";
import { COLORS } from "../../constants";
import { responsiveHeight } from "../../utils/responsiveFunctions";
import { useAppSelector } from "../../redux/hooks";
import { SafeAreaFrameContext } from "react-native-safe-area-context";

type Props = {};

const OrderScreen = (props: Props) => {
    const orderBook = useAppSelector(state => state.order.orderBook);

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
                <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
                    <ListHeader headerTxt="Your orders" rightImg={false} />
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ backgroundColor: COLORS.SKY_BLUE }}>
                        {
                            orderBook && orderBook.map((item: any) => <View key={item.orderId}><OrderCard item={item} /></View>)

                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0, backgroundColor: COLORS.SKY_BLUE }}></SafeAreaView>
        </>
    );
};

export default OrderScreen;
