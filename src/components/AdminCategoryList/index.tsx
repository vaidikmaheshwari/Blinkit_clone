import { View, Text, FlatList, Image, Pressable, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";

import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";
import { editIcon, trashIcon } from "../../assets";
import { AdminListItem } from "../AdminListItem";
import { AdminEditCategoryItemModal } from "../AdminEditCategoryItemModal";
import { AdminDeleteCategoryModal } from "../AdminDeleteCategoryModal";
import { useAppSelector } from "../../redux/hooks";
import { deleteCategoryApi, getAllCategoryListApi } from "../../services/commonApis";
import Toast from "react-native-toast-message";
type Props = {
    categoryList?: any,
    setCategoryList: React.Dispatch<React.SetStateAction<any>>,
};
export const AdminCategoryList = ({ categoryList, setCategoryList }: Props) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { token } = useAppSelector(state => state.user.user)
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const editCategoryHandler = () => {
        setEditModalVisible(true);
    }
    const deleteCategoryHandler = () => {
        setDeleteModalVisible(true);
    }
    const deleteHandler = async () => {
        const id = selectedItem._id;
        const response = await deleteCategoryApi({ accessToken: token, id: id });
        console.log(response);
        if (response.status === 200) {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'category deleted successfully'
            })
            const response = await getAllCategoryListApi(token);
            setCategoryList(response.data);
        }
        else {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'error',
                text1: 'category not deleted'
            })
        }
    }
    return (
        <>
            {categoryList &&
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ paddingBottom: responsiveHeight(80), marginTop: responsiveHeight(20) }}
                    bounces={false}
                    data={categoryList}
                    renderItem={({ item, index }) => <AdminListItem item={item} index={index} setSelectedItem={setSelectedItem} editHandler={editCategoryHandler} deleteHandler={deleteCategoryHandler} />}
                    ItemSeparatorComponent={() => <View style={{ height: responsiveHeight(10) }}></View>}
                    keyExtractor={(item) => item._id}
                />}
            <Modal
                transparent
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}   >
                <AdminEditCategoryItemModal setEditModalVisible={setEditModalVisible} item={selectedItem} setCategoryList={setCategoryList} />
            </Modal>
            <Modal
                transparent
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}>
                <AdminDeleteCategoryModal item={selectedItem} setDeleteModalVisible={setDeleteModalVisible} deleteHandler={deleteHandler} />
            </Modal>
        </>
    );
};