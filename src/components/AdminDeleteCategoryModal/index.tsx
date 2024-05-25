import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native-reanimated/lib/typescript/Animated";
import { cancelIcon } from "../../assets";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight, screenWidth } from "../../utils/responsiveFunctions";

type Props = {
    item: any,
    setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    deleteHandler: () => {}
};

export const AdminDeleteCategoryModal = ({ item, setDeleteModalVisible, deleteHandler }: Props) => {
    return (
        <View style={[styles.modalView]}>
            <View style={[styles.container,]}>
                <Text style={styles.headerTxt}>Are you sure to delete this item?</Text>
                <View style={styles.btnContainer}>
                    <Pressable style={styles.cancelBtnView} onPress={() => setDeleteModalVisible(false)}>
                        <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', textAlign: 'center', fontSize: respFontSize(14) }}>Cancel</Text>
                    </Pressable>
                    <Pressable style={styles.deletebtnView} onPress={() => deleteHandler()}>
                        <Text style={{ color: COLORS.WHITE, fontWeight: 'bold', textAlign: 'center', fontSize: respFontSize(14) }}>Delete</Text>

                    </Pressable>

                </View>


            </View>
        </View >
    );
};
const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: COLORS.TRANSPARENT,
        justifyContent: 'center',
        alignContent: 'center',

    },
    container: {
        alignSelf: 'center',
        width: screenWidth - responsiveWidth(100),
        backgroundColor: COLORS.WHITE,
        borderRadius: responsiveHeight(8),
        paddingVertical: responsiveHeight(10)
    },
    headerTxt: {
        paddingTop: responsiveHeight(10),
        textAlign: 'center',
        fontSize: respFontSize(20),
        width: "80%",
        alignSelf: "center",
        fontWeight: "bold",
        paddingBottom: responsiveHeight(20)
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "80%",
        alignSelf: "center",
        paddingBottom: responsiveWidth(10),
    },
    cancelBtnView: {
        backgroundColor: COLORS.DARK_BLUE,
        borderTopLeftRadius: responsiveHeight(8),
        borderBottomLeftRadius: responsiveHeight(8),
        width: "50%",
        paddingVertical: responsiveHeight(10),
        borderRightWidth: 1,
        borderRightColor: COLORS.WHITE

    },
    deletebtnView: {
        backgroundColor: COLORS.DARK_BLUE,
        borderTopRightRadius: responsiveHeight(8),
        borderBottomRightRadius: responsiveHeight(8),
        width: "50%",
        paddingVertical: responsiveHeight(10),

    }
})

