import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";
import { TextInput } from "react-native-gesture-handler";

type RenderProps = {
    inputTitle: string,
    placeholderTxt: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    keyboardtype?: string

};
export const AdminInput = ({ inputTitle, placeholderTxt, value, setValue, keyboardtype }: RenderProps) => {
    return (
        <View>
            <Text style={styles.txtInputHeader}>{inputTitle}</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                selectionColor={COLORS.BLACK}
                placeholder={placeholderTxt}
                style={styles.txtInput}
                maxLength={50}
                keyboardType={keyboardtype ? keyboardtype : 'default'}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    txtInputHeader: {
        fontWeight: '600',
        fontSize: respFontSize(14),
        marginLeft: responsiveWidth(8),
        marginVertical: responsiveHeight(8)
    },
    txtInput: {
        borderWidth: 0.4,
        borderColor: COLORS.DARKGREY,
        borderRadius: responsiveHeight(6),
        marginHorizontal: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(10)
    }
})
