import { View, Text, StatusBar, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { SetStateAction, useState } from "react";
import { COLORS, ROUTE } from "../../constants";
import { gmailIcon, googleIcon, hideIcon, logo, passwordIcon, showIcons, user } from "../../assets";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";
import { useNavigation } from "@react-navigation/native";
import { RenderTxtinput } from "../../components";
import Toast from "react-native-toast-message";
import { validateEmail, validatePassword } from "../../services/vaildations";
import { createUserApi } from "../../services/commonApis";
import axios from "axios";


const SignUpScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
    const [loader, setLoader] = useState<boolean>(false);
    const navigation = useNavigation();
    const handleRegister = async () => {

        if (name.length < 4) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please fill the name correctly',
                }
            )
            return;
        }
        else if (validateEmail(email) != true) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please fill the email correctly',
                }
            )
            return;
        }
        else if (validatePassword(password) != true) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please fill the password accordingly',
                }
            )
            return;
        }
        else if (password != confirmPassword) {
            Toast.show(
                {
                    type: 'error',
                    text1: 'please match the password',
                }
            )
            return;
        }
        const payload = {
            "fullname": name,
            "email": email,
            "password": password
        }
        setLoader(true);
        const response = await createUserApi(payload);
        console.log(response);
        if (response.status == 200) {
            setLoader(false)
            Toast.show(
                {
                    type: 'success',
                    text1: 'Registration successful',
                }
            )
            navigation.navigate(ROUTE.SIGNIN as never)
        }
        else {
            setLoader(false);
            Toast.show(
                {
                    type: 'error',
                    text1: 'Registration failed',
                }
            )

        }
    }
    return (
        <>
            {/* {
                loader == true && <View style={{ flex: 1, backgroundColor: COLORS.TRANSPARENT, justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>

            } */}


            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={{ top: -responsiveHeight(40) }}>
                    <Image source={logo} style={{ width: responsiveWidth(410), height: responsiveWidth(410) }} />
                    <Text style={styles.headerTxt}>Register your account</Text>
                    <View>
                        <RenderTxtinput text={name} setText={setName} placeholderText={'Enter your name'} leftImg={user} />
                        <RenderTxtinput text={email} setText={setEmail} placeholderText={'Enter your email'} leftImg={gmailIcon} />
                        <RenderTxtinput text={password} setText={setPassword} placeholderText={'Enter your password'} showPassword={showPassword} leftImg={passwordIcon} rightImg={showPassword == true ? showIcons : hideIcon} setShowPassword={setShowPassword} />
                        <RenderTxtinput text={confirmPassword} setText={setConfirmPassword} placeholderText={'Enter confirm password'} showPassword={showConfirmPassword} leftImg={passwordIcon} rightImg={showConfirmPassword == true ? showIcons : hideIcon} setShowPassword={setShowConfirmPassword} />

                        {
                            loader ? <Pressable style={styles.btnContainer} >

                                <ActivityIndicator size="small" color="#00ff00" />
                            </Pressable> :
                                <Pressable style={styles.btnContainer} onPress={() => {
                                    handleRegister()
                                }}>

                                    <Text style={styles.btnTxt}>Register</Text>
                                </Pressable>
                        }


                        <View style={{ alignItems: 'center', gap: responsiveHeight(10) }}>

                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: COLORS.TRANSPARENT }}>Already have an account? </Text>
                                <Pressable style={{}} onPress={() => navigation.navigate(ROUTE.SIGNIN as never)}>
                                    <Text style={{ color: COLORS.GREEN, textDecorationLine: 'underline' }}>Login</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>

            </KeyboardAvoidingView>

        </>
    );
};

export default SignUpScreen;
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
