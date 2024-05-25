import { View, Text, ActivityIndicator, Pressable, StyleSheet, Image } from "react-native";
import React, { SetStateAction, useState } from "react";

import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";
import { browseImg, cancel } from "../../assets";
import { AdminInput } from "../AdminInputs";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { addCategoryApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import { AdminImageInput } from "../AdminImageInput";

type Props = {

};

export const AdminAddCategory = (props: Props) => {
    const [categoryName, setCategoryName] = useState<string>('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useAppSelector(state => state.user.user)
    const handleAddNewCategory = async () => {
        if (selectedImage == null || categoryName == '') {
            Toast.show({
                type: 'error',
                text1: 'Please fill the category details'
            })
            return;
        }
        setIsLoading(true);
        const Authorization = `${token}`;

        const dataObject = {
            name: categoryName,
            image: selectedImage.assets[0].base64
        }
        const response = await addCategoryApi({
            payload: dataObject, accessToken: Authorization
        });
        setIsLoading(false);
        if (response.status === 200) {
            Toast.show({
                type: 'success',
                text1: 'category added successfully'
            })
            setCategoryName('');
            setSelectedImage(null);
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'unable to create category '
            })
        }

    }
    const langString = useAppSelector(state => state.localisation.langString)
    return (
        <View>
            <Text style={styles.headerTxt}>{langString?.categoryInfo} :-</Text>
            <AdminInput inputTitle={langString?.categoryName} placeholderTxt='Fruits' value={categoryName} setValue={setCategoryName} />

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
                            onPress={() => handleAddNewCategory()}
                        >
                            <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontWeight: '700', fontSize: respFontSize(14) }}>{langString.save}</Text>
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


