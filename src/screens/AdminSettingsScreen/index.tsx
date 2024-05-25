import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";

import { powerOff } from "../../assets";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/slices/userSlice";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { setEnglish, setHindi } from "../../redux/slices/localisationSlice";

type Props = {};

const AdminSettingsScreen = (props: Props) => {
    const dispatch = useAppDispatch()
    const logOutHandler = () => {
        dispatch(logoutUser({}));
    }
    const isHindi = useAppSelector(state => state.localisation.isHindi)
    // const [isHindi, setIsHindi] = useState(true);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <View style={{ marginTop: responsiveHeight(10), marginLeft: responsiveWidth(8), marginBottom: responsiveHeight(8) }}>
                <Text style={{ fontWeight: '600', fontSize: respFontSize(15) }}>Choose language</Text>
                <Pressable onPress={() => { dispatch(setHindi({})) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: responsiveHeight(4) }}>
                        <View style={{ height: responsiveWidth(15), width: responsiveWidth(15), borderRadius: responsiveWidth(7.5), borderColor: COLORS.BLACK, borderWidth: 1 }}>
                            {
                                isHindi == true && <View style={{
                                    height: responsiveWidth(10), width: responsiveWidth(10), borderRadius: responsiveWidth(5), borderColor: COLORS.BLACK, backgroundColor: COLORS.BLACK, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: responsiveWidth(1.3)
                                }}></View>
                            }

                        </View>
                        <Text style={{ fontSize: respFontSize(14) }}>Hindi</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => { dispatch(setEnglish({})) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <View style={{ height: responsiveWidth(15), width: responsiveWidth(15), borderRadius: responsiveWidth(7.5), borderColor: COLORS.BLACK, borderWidth: 1 }}>
                            {
                                isHindi == false && <View style={{
                                    height: responsiveWidth(10), width: responsiveWidth(10), borderRadius: responsiveWidth(5), borderColor: COLORS.BLACK, backgroundColor: COLORS.BLACK, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: responsiveWidth(1.3)
                                }}></View>
                            }
                        </View>

                        <Text style={{ fontSize: respFontSize(14) }}>English</Text>
                    </View>
                </Pressable>
            </View>
            <Pressable onPress={logOutHandler} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(10), alignItems: 'center', marginLeft: responsiveWidth(8) }}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <View style={{ backgroundColor: COLORS.PENCIL, borderRadius: responsiveWidth(14), padding: 4 }}>
                        <Image source={powerOff} style={{ width: responsiveWidth(22), height: responsiveHeight(22), tintColor: COLORS.LIGHT_PENCIL }} />
                    </View>

                    <Text style={{ fontSize: respFontSize(14) }}>Logout</Text>
                </View>
                {/* <Image source={rightImg} style={{ width: 11, height: 11, tintColor: COLORS.LIGHT_PENCIL }} /> */}
            </Pressable>
        </View>
    );
};

export default AdminSettingsScreen;
