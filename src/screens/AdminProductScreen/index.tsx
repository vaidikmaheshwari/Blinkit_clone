import { View, Text } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants";
import { AdminAddProduct, AdminProductList, AdminTab } from "../../components";

type Props = {};

const AdminProductScreen = (props: Props) => {
    const [activeTab, setActiveTab] = useState(1);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <AdminTab
                text1="Add Product"
                text2="Product List"
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {
                activeTab == 1 ?
                    <AdminAddProduct />
                    :
                    <AdminProductList />
            }
        </View>
    );
};

export default AdminProductScreen;
