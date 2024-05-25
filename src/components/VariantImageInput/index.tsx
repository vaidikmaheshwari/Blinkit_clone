import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { browseImg, cancel } from "../../assets";
import { COLORS } from "../../constants";
import { launchImageLibrary } from "react-native-image-picker";

type Props = {
    selectedImg: any;
    setSelectedImg: React.Dispatch<React.SetStateAction<any>>;
    image_url?: string
};

export const VariantImageInput = ({ selectedImg, setSelectedImg, image_url }: Props) => {
    const handleImagePicker = async () => {
        await launchImageLibrary({
            mediaType: "photo",
            includeBase64: true,

        }, response => {
            // Check if the user canceled the action
            if (response.didCancel) {
                console.log('User canceled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Update selected image state
                console.log('User canceled image picker');
                setSelectedImg(response);
                // console.log(response.assets[0]);
                // console.log("avd", selec)
            }
        });
    }
    return (
        <View style={{ marginBottom: responsiveHeight(8) }}>
            {/* <Text style={styles.txtInputHeader}>Upload image</Text> */}


            <Pressable onPress={() => handleImagePicker()}>
                <View style={{
                    borderStyle: 'dashed',
                    borderColor: COLORS.BLUE,
                    borderWidth: 1,
                    marginHorizontal: responsiveWidth(8),
                    borderRadius: responsiveHeight(8),
                    height: responsiveHeight(130),
                    width: responsiveHeight(130),
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                    {
                        (selectedImg == null && !image_url) && <View>
                            <Image source={browseImg} style={{ width: responsiveWidth(30), height: responsiveHeight(30), alignSelf: 'center' }} />
                            <Text style={{ color: COLORS.SHINE_BLUE, textAlign: 'center', fontWeight: '500', fontSize: respFontSize(8) }}>select or upload the image</Text>
                        </View>
                    }
                    {(selectedImg == null && image_url) && <Image source={{ uri: image_url }} style={{ height: responsiveHeight(130), resizeMode: 'contain' }} />}
                    {(selectedImg != null) && <Image source={{ uri: selectedImg?.assets[0].uri }} style={{ height: responsiveHeight(130), resizeMode: 'contain' }} />
                    }

                </View>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    txtInputHeader: {
        fontWeight: '600',
        fontSize: respFontSize(14),
        marginLeft: responsiveWidth(8),
        marginVertical: responsiveHeight(8)
    },
})


