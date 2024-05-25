import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { COLORS } from "../../constants";
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";

type RenderProps = {
    text: string,
    setShowPassword?: React.Dispatch<React.SetStateAction<boolean>> | any,
    setText: React.Dispatch<React.SetStateAction<string>>,
    placeholderText: string,
    showPassword?: boolean,
    leftImg?: any,
    rightImg?: any,

};
export const RenderTxtinput = ({
    text, setText, placeholderText, showPassword, leftImg, rightImg, setShowPassword
}: RenderProps) => {


    return (
        <View style={styles.txtInput}>
            <Image source={leftImg} style={{ width: 20, height: 20 }} />
            <TextInput
                // style={}

                style={{ width: "86%", marginHorizontal: "1%" }}
                placeholderTextColor={COLORS.LIGHT_PENCIL}
                placeholder={placeholderText}
                value={text}
                onChangeText={setText}
                selectionColor={COLORS.BLACK}
                maxLength={50}
                inputMode={placeholderText == 'Enter your email' ? "email" : "text"}
                secureTextEntry={(placeholderText === 'Enter your password' || placeholderText === 'Enter confirm password') && showPassword == true && true}
            />
            <Pressable onPress={() => { setShowPassword(!showPassword) }}>
                <Image source={rightImg} style={{ width: 20, height: 20, tintColor: COLORS.BLACK }} />

            </Pressable>


        </View>

    )
}
const styles = StyleSheet.create({
    txtInput: {
        backgroundColor: COLORS.WHITE,
        width: responsiveWidth(410),
        paddingVertical: responsiveHeight(15),
        borderRadius: responsiveHeight(10),
        paddingHorizontal: 10,
        marginBottom: responsiveHeight(10),
        flexDirection: 'row'
    },
})
