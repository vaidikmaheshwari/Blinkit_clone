
import { View, Text, ActivityIndicator, Pressable, StyleSheet, Image } from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";

import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";
import { browseImg, cancel } from "../../assets";
import { AdminInput } from "../AdminInputs";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { addCategoryApi, addSubCategoryApi, getAllCategoryListApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import { AdminImageInput } from "../AdminImageInput";
import { CustomDropdown } from "../CustomDropdown";
import { ScrollView } from "react-native-gesture-handler";

type Props = {

};

export const AdminAddSubCategory = (props: Props) => {
    const [subCategoryName, setSubCategoryName] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.user.user)
    const handleAddSubCategory = async () => {

        if (selectedImage == null || subCategoryName == '' || selectedCategory == null) {
            Toast.show({
                type: 'error',
                text1: 'Please fill the category details'
            })
            return;
        }
        setIsLoading(true);
        const Authorization = `${token}`;

        const dataObject = {
            name: subCategoryName,
            image: selectedImage.assets[0].base64,
            category_id: selectedCategory._id
        }
        const response = await addSubCategoryApi({
            payload: dataObject, accessToken: Authorization
        });

        setIsLoading(false);
        if (response.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'sub-category added successfully'
            })
            setSubCategoryName('');
            setSelectedImage(null);
            setSelectedCategory(null);
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'unable to create sub-category '
            })
        }

    }
    const getCategory = async () => {
        const response = await getAllCategoryListApi(token);
        // Toast.show({
        //     type: 'error',
        //     text1: 'category not found /fetched'
        // })
        setCategoryList(response.data);

    }
    useEffect(() => {
        getCategory();

    }, [])
    return (
        <View>
            <Text style={styles.headerTxt}>Sub-Category information :-</Text>

            <CustomDropdown
                list={categoryList}
                headingtxt={"Select Category*"}
                selectedValue={selectedCategory}
                setSelectedValue={setSelectedCategory}
            />


            <AdminInput inputTitle="Sub-Category Name" placeholderTxt='Mango' value={subCategoryName} setValue={setSubCategoryName} />

            <View>
                <AdminImageInput selectedImg={selectedImage} setSelectedImg={setSelectedImage} />

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
                            onPress={() => handleAddSubCategory()}

                        >
                            <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontWeight: '700', fontSize: respFontSize(14) }}>Save</Text>
                        </Pressable>
                }


            </View>
        </View>
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



