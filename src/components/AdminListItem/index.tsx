import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { editIcon, trashIcon } from "../../assets";

type Props = {};

export const AdminListItem = ({ item, index, setSelectedItem, editHandler, deleteHandler }: any) => {
    return (
        <View style={[{ backgroundColor: index % 2 == 0 ? COLORS.WHITE : COLORS.GREY, }, styles.container]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image_url }} style={{ width: responsiveWidth(50), height: responsiveWidth(50), marginRight: responsiveWidth(8) }} />
                <Text style={{ fontSize: respFontSize(13), fontWeight: '600' }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Pressable onPress={() => {
                    setSelectedItem(item);
                    editHandler();
                }} >
                    <Image source={editIcon} style={{ width: responsiveWidth(14), height: responsiveHeight(25), resizeMode: 'contain', tintColor: COLORS.LIGHT_PENCIL }} />
                </Pressable>
                <Pressable onPress={() => {
                    setSelectedItem(item);
                    deleteHandler();
                }}>
                    <Image source={trashIcon} style={{ width: responsiveWidth(18), height: responsiveHeight(30), resizeMode: 'contain', tintColor: COLORS.RED }} />

                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(8),

        justifyContent: 'space-between',
        alignContent: 'center'
    }
})


