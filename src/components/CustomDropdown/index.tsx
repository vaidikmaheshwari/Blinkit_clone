import { View, Text, TouchableOpacity, Image, TextInput, FlatList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React, { useRef, useState } from "react";
import { downward, upward } from "../../assets";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";

export function CustomDropdown({ list, headingtxt, selectedValue, setSelectedValue, }: any) {
    const [clicked, setClicked] = useState(false);


    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.dropdownBtn,]}
                onPress={() => {
                    setClicked(!clicked);
                }}
            >
                <Text style={{ fontSize: respFontSize(13) }}>{selectedValue == null ? headingtxt : selectedValue.name}</Text>
                {clicked ? (
                    <Image source={upward} style={styles.dropdownImg} />
                ) : (
                    <Image source={downward} style={{ width: responsiveWidth(17), height: responsiveHeight(12) }} />
                )}
            </Pressable>
            {clicked ? (
                <View style={styles.listView}>
                    <FlatList
                        data={list ? list : ['']}
                        style={{ overflow: 'hidden' }}
                        renderItem={({ item }) => {
                            if (item != '') {
                                return (
                                    <Pressable
                                        style={styles.listBtn}
                                        onPress={() => {
                                            setSelectedValue(item);
                                            setClicked(!clicked);
                                        }}
                                    >
                                        <Text style={{ fontSize: respFontSize(13) }}>{item.name}</Text>
                                    </Pressable>
                                );

                            }
                            else {
                                return (
                                    <View style={styles.listBtn}>
                                        <ActivityIndicator size='small' color={COLORS.BLACK} />
                                    </View>
                                )
                            }

                        }}
                    />
                </View>
            ) : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // marginBottom: "2%",
    },
    dropdownBtn: {
        width: responsiveWidth(410),
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(8),
        borderRadius: responsiveHeight(8),
        marginBottom: responsiveHeight(10),
        backgroundColor: COLORS.GREY,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    dropdownImg: {
        width: responsiveWidth(18),
        height: responsiveHeight(18),
    },
    listView: {

        // marginTop: 20,
        // height: responsiveHeight(300),
        maxHeight: responsiveHeight(300),
        alignSelf: "center",
        width: responsiveWidth(410),
        backgroundColor: COLORS.GREY,
        borderRadius: responsiveHeight(8),
        overflow: "hidden",
        marginBottom: responsiveHeight(10),
    },
    listBtn: {
        width: "100%",

        paddingVertical: responsiveHeight(8),
        justifyContent: "center",
        borderBottomWidth: 0.3,
        borderColor: COLORS.LIGHT_PENCIL,
        paddingLeft: responsiveWidth(10),
    },
});