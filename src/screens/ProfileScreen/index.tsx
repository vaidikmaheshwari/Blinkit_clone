import { View, Text, StatusBar, StyleSheet, Image, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { COLORS, ROUTE } from "../../constants";
import { ListHeader } from "../../components";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { adddressBook, cartImg, delivery, powerOff, right, rightImg } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logoutUser } from "../../redux/slices/userSlice";

type Props = {};
const textComponent = (img: any, txt: string, btnhandler: any) => {
    return (
        <Pressable onPress={btnhandler} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(10), alignItems: 'center', }}>
            <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <View style={{ backgroundColor: COLORS.PENCIL, borderRadius: responsiveWidth(14), padding: 4 }}>
                    <Image source={img} style={{ width: responsiveWidth(22), height: responsiveHeight(22), tintColor: COLORS.LIGHT_PENCIL }} />
                </View>

                <Text>{txt}</Text>
            </View>
            <Image source={rightImg} style={{ width: 11, height: 11, tintColor: COLORS.LIGHT_PENCIL }} />
        </Pressable>
    )
}
const ProfileScreen = (props: Props) => {
    const navigation = useNavigation();
    const orderHandler = () => {
        // console.log("Hello");
        // NavigationContainer,
        navigation.navigate(ROUTE.ORDERS as never);
    }
    const dispatch = useAppDispatch();
    const logOutHandler = () => {
        dispatch(logoutUser({}));
    }

    const user = useAppSelector(state => state.user.user)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <View style={{ flex: 1, backgroundColor: COLORS.WHITE, }}>
                <ListHeader headerTxt="Profile" rightImg={false} />
                <View style={styles.container}>
                    <Text style={styles.userName}>{user?.user_name}</Text>
                    <Text style={styles.lightTxt}>{user?.user_email}</Text>
                </View>
                <View>
                    <View style={styles.container}>
                        <Text style={styles.headerTxt}>YOUR INFORMATION</Text>
                        {textComponent(
                            img = cartImg,
                            txt = "Your Orders",
                            btnhandler = orderHandler,

                        )}
                        {textComponent(
                            img = adddressBook,
                            txt = "Address Book",
                            btnhandler = orderHandler,

                        )}
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.headerTxt}>OTHER INFORMATION</Text>
                        {textComponent(
                            img = powerOff,
                            txt = "Log out",
                            btnhandler = logOutHandler,

                        )}

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreen;
const styles = StyleSheet.create({
    container: {
        paddingTop: responsiveHeight(20),
        paddingHorizontal: responsiveWidth(10),
        gap: 5
    },
    userName: {
        // paddingTop: responsiveHeight(20),
        fontWeight: 'bold',
        fontSize: respFontSize(18),

    },
    lightTxt: {
        fontWeight: '300'
    },
    headerTxt: {
        color: COLORS.LIGHT_PENCIL,
    }
})
