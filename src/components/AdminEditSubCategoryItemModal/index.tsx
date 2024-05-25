import { View, Text, ActivityIndicator, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import React, { useState } from "react";
import { CustomModal } from "../CustomModal";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { AdminImageInput } from "../AdminImageInput";
import { AdminInput } from "../AdminInputs";
import { COLORS } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { editCategoryApi, editSubCategoryApi, getAllCategoryListApi, getSpecificSubcategoriesListApi } from "../../services/commonApis";
import Toast from "react-native-toast-message";
import { CustomDropdown } from "../CustomDropdown";

type Props = {
    setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
    setSubCategoryList: React.Dispatch<React.SetStateAction<any>>;
    categoryList: any;
};

export const AdminEditSubCategoryItemModal = ({ setEditModalVisible, item, setSubCategoryList, categoryList }: Props) => {
    console.log(item);
    const [subcategoryName, setSubCategoryName] = useState<string>(item.name);
    const [selectedImage, setSelectedImage] = useState(null);
    const selectedCategoryName = categoryList.find(obj => item.category_id == obj._id);
    console.log("hello", selectedCategoryName);
    const [selectedCategory, setSelectedCategory] = useState(selectedCategoryName);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.user.user)
    // const getCategory = async () => {
    //     const response = await getAllCategoryListApi(token);
    //     if (response.status != 200) {
    //         Toast.show({
    //             type: 'error',
    //             text1: 'Category not fetched/found'
    //         })
    //     }
    //     setCategoryList(response.data);

    // }
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
    const editCategory = async () => {

        if (selectedImage != null) {
            const image = selectedImage.assets[0].base64;
            const obj = {
                _id: item._id,
                image: image,
                name: subcategoryName,
                category_id: selectedCategory._id
            }
            setIsLoading(true);
            const response = await editSubCategoryApi({ accessToken: token, payload: obj });

            setIsLoading(false);
            if (response.status == 200) {

                setEditModalVisible(false);
                Toast.show({
                    type: "success",
                    text1: "sub-category edited successfully"
                })
                // getCategory();
                getSubCategory();

            }
            else {
                Alert.alert('sub-category not edited')
            }


        }
        else {
            const obj = {
                _id: item._id,
                name: subcategoryName,
                category_id: selectedCategory._id
            }
            setIsLoading(true);
            const response = await editSubCategoryApi({ accessToken: token, payload: obj });

            setIsLoading(false);
            if (response.status == 200) {
                console.log("Hello");
                setEditModalVisible(false);
                Toast.show({
                    type: "success",
                    text1: "sub-category edited successfully"
                })
                getSubCategory();

            }
            else {
                Alert.alert('sub-category not edited')
            }
        }

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <CustomModal setModalVisible={setEditModalVisible}>
                <View style={{ paddingTop: responsiveHeight(20), paddingBottom: responsiveHeight(30) }}>
                    <View>
                        <Text style={styles.headerTxt}>Sub Category information :-</Text>
                        <CustomDropdown
                            list={categoryList}
                            headingtxt={"Select Category*"}
                            selectedValue={selectedCategory}
                            setSelectedValue={setSelectedCategory}
                        />
                        <AdminInput inputTitle="Sub-Category Name" placeholderTxt='Fruits' value={subcategoryName} setValue={setSubCategoryName} />

                        <View>

                            <AdminImageInput selectedImg={selectedImage} setSelectedImg={setSelectedImage} image_url={item.image_url} />

                            {
                                isLoading ? <Pressable style={{
                                    backgroundColor: COLORS.DARK_BLUE,
                                    marginHorizontal: responsiveWidth(8),
                                    borderRadius: responsiveHeight(8),
                                    paddingVertical: responsiveHeight(10),
                                    marginTop: responsiveHeight(40)
                                }}

                                >
                                    <ActivityIndicator size='small' color={COLORS.WHITE} />
                                </Pressable> :
                                    <Pressable style={{
                                        backgroundColor: COLORS.DARK_BLUE,
                                        marginHorizontal: responsiveWidth(8),
                                        borderRadius: responsiveHeight(8),
                                        paddingVertical: responsiveHeight(10),
                                        marginTop: responsiveHeight(40)
                                    }}
                                        onPress={() => editCategory()}

                                    >
                                        <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontWeight: '700', fontSize: respFontSize(14) }}>Save</Text>
                                    </Pressable>
                            }


                        </View>
                    </View>
                </View>
            </CustomModal>
        </KeyboardAvoidingView>
    );
};
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


