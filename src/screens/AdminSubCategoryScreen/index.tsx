import { View, StyleSheet, } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { AdminAddSubCategory, AdminSubCategoryList, AdminTab } from "../../components";
const AdminCategoryScreen = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <View>
                <AdminTab
                    text1='Add Sub-Category'
                    text2='Sub-Category List'
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                {
                    activeTab == 1 ?
                        <AdminAddSubCategory />
                        :
                        <AdminSubCategoryList />
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
