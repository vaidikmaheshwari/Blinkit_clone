import { View, Text, StatusBar, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import React, { SetStateAction, useState } from "react";
import { COLORS, ROUTE } from "../../constants";
import { gmailIcon, googleIcon, hideIcon, logo, passwordIcon, showIcons } from "../../assets";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";
import { useNavigation } from "@react-navigation/native";
import { RenderTxtinput } from "../../components";
import { validateEmail, validatePassword } from "../../services/vaildations";
import Toast from "react-native-toast-message";

import { useDispatch } from "react-redux";
import { fetchLoginApi } from "../../redux/slices/userSlice";
import { useAppSelector } from "../../redux/hooks";


const SignInScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const isLoading = useAppSelector(state => state.user.isLoading)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        if (email == '' || validateEmail(email) == false) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please fill the email',
                }
            )
            return;
        }
        else if (password == '' || validatePassword(password) == false) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please fill the password',
                }
            )
            return;
        }
        dispatch(fetchLoginApi({ email, password }));
    }
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{ top: -responsiveHeight(40) }}>
                <Image source={logo} style={{ width: responsiveWidth(410), height: responsiveWidth(410) }} />
                <Text style={styles.headerTxt}>Login your account</Text>
                <View>
                    <RenderTxtinput text={email} setText={setEmail} placeholderText={'Enter your email'} leftImg={gmailIcon} />
                    <RenderTxtinput text={password} setText={setPassword} placeholderText={'Enter your password'} showPassword={showPassword} leftImg={passwordIcon} rightImg={showPassword == true ? showIcons : hideIcon} setShowPassword={setShowPassword} />

                    {
                        isLoading ? <Pressable style={styles.btnContainer} >
                            <ActivityIndicator size='small' color={COLORS.WHITE} />
                        </Pressable> :
                            <Pressable style={styles.btnContainer} onPress={() => {
                                handleLogin()
                            }}>
                                <Text style={styles.btnTxt}>Login</Text>
                            </Pressable>

                    }

                    <View style={{ alignItems: 'center', gap: responsiveHeight(10) }}>
                        <Text style={{ fontSize: respFontSize(13) }}>Or Login With</Text>
                        <Pressable style={{ backgroundColor: COLORS.WHITE, padding: 5, borderRadius: 20 }}>
                            <Image source={googleIcon} />
                        </Pressable>
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: COLORS.TRANSPARENT }}>Don't have account? </Text>
                            <Pressable style={{}} onPress={() => navigation.navigate(ROUTE.SIGNUP as never)}>
                                <Text style={{ color: COLORS.GREEN, textDecorationLine: 'underline' }}>Register</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    );
};

export default SignInScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.YELLOW,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTxt: {
        fontSize: respFontSize(24),
        fontWeight: '700',
        paddingBottom: responsiveHeight(40),
        textAlign: 'center'
    },
    txtInput: {
        backgroundColor: COLORS.WHITE,
        width: responsiveWidth(410),
        paddingVertical: responsiveHeight(15),
        borderRadius: responsiveHeight(10),
        paddingHorizontal: 10,
        marginBottom: responsiveHeight(10),
        flexDirection: 'row'
    },
    btnContainer: {
        width: responsiveWidth(410),
        backgroundColor: COLORS.GREEN,
        paddingVertical: responsiveHeight(15),
        borderRadius: responsiveHeight(10),
        marginVertical: responsiveHeight(20),
    },
    btnTxt: {
        textAlign: 'center',
        color: COLORS.WHITE,
        fontWeight: '700',
        fontSize: respFontSize(15)
    }

})
