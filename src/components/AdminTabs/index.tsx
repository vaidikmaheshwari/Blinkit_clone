import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";

type Props = {
    text1: string,
    text2: string,
    activeTab: number,
    setActiveTab: React.Dispatch<React.SetStateAction<number>>,
    btn1Handler?: () => void,
    btn2Handler?: () => void,

};

export const AdminTab = ({ text1, text2, activeTab, setActiveTab, btn1Handler, btn2Handler }: Props) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: responsiveWidth(8),
            marginTop: responsiveHeight(10),
            borderRadius: responsiveHeight(8),
            overflow: 'hidden',

        }}>
            <Pressable style={[{
                width: "50%",
                backgroundColor: activeTab == 1 ? COLORS.DARK_BLUE : COLORS.TINT,
                paddingVertical: responsiveHeight(10),
            }, {}]} onPress={() => {
                setActiveTab(1);
                btn1Handler && btn1Handler();
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: activeTab == 1 ? COLORS.WHITE : COLORS.WHITE,
                    fontWeight: '700',
                }}>{text1}</Text>
            </Pressable>
            <Pressable style={{
                width: "50%",
                backgroundColor: activeTab == 2 ? COLORS.DARK_BLUE : COLORS.TINT,
                paddingVertical: responsiveHeight(10),
            }} onPress={() => {
                setActiveTab(2)
                btn2Handler && btn2Handler();
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: activeTab == 2 ? COLORS.WHITE : COLORS.WHITE,
                    fontWeight: '700',
                }}>{text2}</Text>
            </Pressable>
        </View>
    );
};


