import { View, Text, Pressable, StyleSheet, Image, Alert, ActionSheetIOS, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";

import { AdminAddCategory, AdminCategoryList, AdminInput, AdminTab } from "../../components";
import { getAllCategoryListApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import Toast from "react-native-toast-message";





const AdminCategoryScreen = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [categoryList, setCategoryList] = useState(null);
    const { token } = useAppSelector(state => state.user.user)
    const btn2Handler = async () => {

        const response = await getAllCategoryListApi(token);
        if (response.status != 200) {
            Toast.show({
                type: 'error',
                text1: 'category not fetched'
            })
        }
        setCategoryList(response.data);
    }
    const langString = useAppSelector(state => state.localisation.langString)

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <View>
                <AdminTab
                    text1={langString.addCategory}
                    text2={langString.categoryList}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    btn2Handler={btn2Handler}
                />
                {
                    activeTab == 1 ?
                        <AdminAddCategory />
                        :
                        <AdminCategoryList categoryList={categoryList} setCategoryList={setCategoryList} />
                }

            </View>


        </View>
    );
};

export default AdminCategoryScreen;
const styles = StyleSheet.create({
    headerTxt: {
        fontWeight: '600',
        fontSize: respFontSize(15),
        marginVertical: responsiveHeight(6),
        marginLeft: responsiveWidth(8),
    },
    txtInputHeader: {
        fontWeight: '600',
        fontSize: respFontSize(14),
        marginLeft: responsiveWidth(8),
        marginVertical: responsiveHeight(8)
    },
})
