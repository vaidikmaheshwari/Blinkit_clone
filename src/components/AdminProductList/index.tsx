import { View, Text, FlatList, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomDropdown } from "../CustomDropdown";
import { deleteProductApi, getAllCategoryListApi, getProductListApi, getSpecificSubcategoriesListApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { AdminListItem } from "../AdminListItem";
import Toast from "react-native-toast-message";
import { AdminEditCategoryItemModal } from "../AdminEditCategoryItemModal";
import { AdminDeleteCategoryModal } from "../AdminDeleteCategoryModal";

type Props = {};

export const AdminProductList = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [subCategoryList, setSubCategoryList] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [productList, setProductList] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const { token } = useAppSelector(state => state.user.user);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const getCategory = async () => {
        const response = await getAllCategoryListApi(token);
        if (response.status != 200) {
            Toast.show({
                type: 'error',
                text1: 'Category not fetched/found'
            })
        }
        setCategoryList(response.data);
    }
    const getSubCategory = async () => {
        const payload = {
            category_id: selectedCategory?._id,
        }
        const response = await getSpecificSubcategoriesListApi({ payload: payload, accessToken: token });
        if (response.status != 200) {
            Toast.show({
                type: 'error',
                text1: 'subCategory not fetched/found'
            })
        }
        setSubCategoryList(response.data);
    }
    const getProductList = async () => {
        const payload = {
            subcategory_id: selectedSubCategory?._id,
        }
        const response = await getProductListApi({ payload: payload, accessToken: token });
        if (response.status != 200) {
            Toast.show({
                type: 'error',
                text1: 'products not fetched/found'
            })
        }
        setProductList(response.data);
    }
    useEffect(() => {
        setSelectedSubCategory(null);
        setSubCategoryList(null);
        if (selectedCategory != null) {
            setProductList(null);
            getSubCategory();
        }
    }, [selectedCategory?._id])
    useEffect(() => {
        getCategory();
    }, []);
    useEffect(() => {
        if (selectedSubCategory != null) {
            setProductList(null);
            getProductList();
        }
    }, [selectedSubCategory?._id])
    const editCategoryHandler = () => {
        setEditModalVisible(true);
    }
    const deleteCategoryHandler = () => {
        setDeleteModalVisible(true);
    }
    const deleteHandler = async () => {
        const id = selectedItem._id;
        console.log(selectedItem);
        const response = await deleteProductApi({ accessToken: token, id: id });
        console.log(response);
        if (response.status === 200) {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'product deleted successfully'
            })
            getProductList();
            // getSubCategory();
        }
        else {
            setDeleteModalVisible(false);
            Toast.show({
                type: 'error',
                text1: 'product not deleted'
            })
        }
    }
    return (
        <>
            <View style={{ marginTop: responsiveHeight(10) }}>
                <CustomDropdown
                    list={categoryList}
                    headingtxt={"Select Category*"}
                    selectedValue={selectedCategory}
                    setSelectedValue={setSelectedCategory}
                />
                <CustomDropdown
                    list={subCategoryList}
                    headingtxt={"Select Sub-Category*"}
                    selectedValue={selectedSubCategory}
                    setSelectedValue={setSelectedSubCategory}
                />
                {productList &&
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ paddingBottom: responsiveHeight(80), }}
                        bounces={false}
                        data={productList}
                        renderItem={({ item, index }) => <AdminListItem item={item} index={index} setSelectedItem={setSelectedItem}
                            editHandler={editCategoryHandler} deleteHandler={deleteCategoryHandler} />}
                        ItemSeparatorComponent={() => <View style={{ height: responsiveHeight(10) }}></View>}
                        keyExtractor={(item) => item._id}
                    />}
            </View>
            <Modal
                transparent
                visible={editModalVisible}
                onRequestClose={() => setEditModalVisible(false)}
            >
                {/* <AdminEditCategoryItemModal setEditModalVisible={setEditModalVisible} item={selectedItem} /> */}
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