import { View, Text, ActivityIndicator, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import React, { useState } from "react";
import { CustomModal } from "../CustomModal";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { AdminImageInput } from "../AdminImageInput";
import { AdminInput } from "../AdminInputs";
import { COLORS } from "../../constants";
import { useAppSelector } from "../../redux/hooks";
import { editCategoryApi, getAllCategoryListApi } from "../../services/commonApis";
import Toast from "react-native-toast-message";

type Props = {
    setEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    item: any;
    setCategoryList?: React.Dispatch<React.SetStateAction<any>>;
};

export const AdminEditCategoryItemModal = ({ setEditModalVisible, item, setCategoryList }: Props) => {

    const [categoryName, setCategoryName] = useState<string>(item.name);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.user.user)
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
    const editCategory = async () => {

        if (selectedImage != null) {
            const image = selectedImage.assets[0].base64;
            const obj = {
                _id: item._id,
                image: image,
                name: categoryName
            }
            setIsLoading(true);
            const response = await editCategoryApi({ accessToken: token, payload: obj });

            setIsLoading(false);
            if (response.status == 200) {

                setEditModalVisible(false);
                Toast.show({
                    type: "success",
                    text1: "category edited successfully"
                })
                getCategory();

            }
            else {
                Alert.alert('category not edited')
            }


        }
        else {
            const obj = {
                _id: item._id,
                name: categoryName
            }
            setIsLoading(true);
            const response = await editCategoryApi({ accessToken: token, payload: obj });

            setIsLoading(false);
            if (response.status == 200) {
                console.log("Hello");
                setEditModalVisible(false);
                Toast.show({
                    type: "success",
                    text1: "category edited successfully"
                })
                getCategory();

            }
            else {
                Alert.alert('category not edited')
            }
        }

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <CustomModal setModalVisible={setEditModalVisible}>
                <View style={{ paddingTop: responsiveHeight(20), paddingBottom: responsiveHeight(30) }}>
                    <View>
                        <Text style={styles.headerTxt}>Category information :-</Text>
                        <AdminInput inputTitle="Category Name" placeholderTxt='Fruits' value={categoryName} setValue={setCategoryName} />

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


