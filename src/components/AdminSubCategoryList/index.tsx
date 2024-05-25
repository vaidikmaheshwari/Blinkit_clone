
import { View, FlatList, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";

import { responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { CustomDropdown } from "../CustomDropdown";
import { deleteSubCategoryApi, getAllCategoryListApi, getSpecificSubcategoriesListApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import { AdminListItem } from "../AdminListItem";
import { AdminEditCategoryItemModal } from "../AdminEditCategoryItemModal";
import { AdminDeleteCategoryModal } from "../AdminDeleteCategoryModal";
import Toast from "react-native-toast-message";
import { AdminEditSubCategoryItemModal } from "../AdminEditSubCategoryItemModal";
type Props = {};
export const AdminSubCategoryList = ({ }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [subCategoryList, setSubCategoryList] = useState(null);
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
        console.log(selectedItem);
        const response = await deleteSubCategoryApi({ accessToken: token, id: id });
        console.log(response);
        if (response.status === 200) {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'subcategory deleted successfully'
            })
            getSubCategory();
        }
        else {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'error',
                text1: 'subcategory not deleted'
            })
        }


    }
    const getSubCategory = async () => {
        if (selectedCategory != null) {
            const payload = {
                category_id: selectedCategory._id,
            }
            const response = await getSpecificSubcategoriesListApi({ payload: payload, accessToken: token });
            if (response.status != 200) {
                Toast.show({
                    type: 'error',
                    text1: 'subcategory not found/fetched'
                })
            }
            setSubCategoryList(response.data);
        }
    }
    const getCategory = async () => {
        const response = await getAllCategoryListApi(token);
        if (response.status != 200) {
            Toast.show({
                type: 'error',
                text1: 'category not found/fetched'
            })
        }
        setCategoryList(response.data);
    }
    useEffect(() => {
        if (selectedCategory != null) {
            setSubCategoryList(null);
            getSubCategory();
        }
    }, [selectedCategory?._id])
    useEffect(() => {
        getCategory();
    }, [])
    return (
        <>
            <View style={{ marginTop: responsiveHeight(8) }}>
                <CustomDropdown
                    list={categoryList}
                    headingtxt={"Select Category*"}
                    selectedValue={selectedCategory}
                    setSelectedValue={setSelectedCategory}
                />
                {
                    subCategoryList && <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: responsiveHeight(80), }}
                        data={subCategoryList}
                        renderItem={({ item, index }) => <AdminListItem item={item} index={index} setSelectedItem={setSelectedItem} editHandler={editCategoryHandler} deleteHandler={deleteCategoryHandler} />}
                        ItemSeparatorComponent={() => <View style={{ height: responsiveHeight(10) }}></View>}
                        keyExtractor={(item) => item._id}
                    />
                }
            </View>
            <Modal
                transparent
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)} >
                <AdminEditSubCategoryItemModal setEditModalVisible={setEditModalVisible} item={selectedItem} setSubCategoryList={setSubCategoryList} categoryList={categoryList} />
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
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(8),

        justifyContent: 'space-between',
        alignContent: 'center'
    }
})