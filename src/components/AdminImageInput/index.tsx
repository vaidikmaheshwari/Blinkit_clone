import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { browseImg, cancel } from "../../assets";
import { COLORS } from "../../constants";
import { launchImageLibrary } from "react-native-image-picker";
import { useAppSelector } from "../../redux/hooks";

type Props = {
    selectedImg: any;
    setSelectedImg: React.Dispatch<React.SetStateAction<any>>;
    image_url?: string
};

export const AdminImageInput = ({ selectedImg, setSelectedImg, image_url }: Props) => {
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
                setSelectedImg(response);
                // console.log("avd", selectedImage)
            }
        });
    }
    const langString = useAppSelector(state => state.localisation.langString)
    return (
        <View>
            <Text style={styles.txtInputHeader}>{langString.uploadImage}</Text>
            {
                selectedImg != null && !image_url &&
                <Pressable onPress={() => setSelectedImg(null)}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: responsiveWidth(8), marginTop: responsiveHeight(4), borderRadius: responsiveHeight(8), borderColor: COLORS.TRANSPARENT, borderWidth: 0.3, alignSelf: 'flex-start', paddingHorizontal: 4, paddingVertical: 2, backgroundColor: COLORS.LIGHT_GREY, marginBottom: responsiveHeight(4),
                    }}>
                        <Image source={cancel} style={{ width: responsiveWidth(15), height: responsiveWidth(15), tintColor: COLORS.TRANSPARENT }} />
                        <Text style={{ fontSize: respFontSize(12), color: COLORS.TINT, marginTop: -1 }}>Remove this image</Text>

                    </View>

                </Pressable>
            }
            {
                selectedImg != null && image_url &&
                <Pressable onPress={() => setSelectedImg(null)}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: responsiveWidth(8), marginTop: responsiveHeight(4), borderRadius: responsiveHeight(8), borderColor: COLORS.TRANSPARENT, borderWidth: 0.3, alignSelf: 'flex-start', paddingHorizontal: 4, paddingVertical: 2, backgroundColor: COLORS.LIGHT_GREY, marginBottom: responsiveHeight(4),
                    }}>
                        <Image source={cancel} style={{ width: responsiveWidth(15), height: responsiveWidth(15), tintColor: COLORS.TRANSPARENT }} />
                        <Text style={{ fontSize: respFontSize(12), color: COLORS.TINT, marginTop: -1 }}>Remove this image</Text>

                    </View>

                </Pressable>
            }

            <Pressable onPress={() => handleImagePicker()}>
                <View style={{
                    borderStyle: 'dashed',
                    borderColor: COLORS.BLUE,
                    borderWidth: 1,
                    marginHorizontal: responsiveWidth(8),
                    borderRadius: responsiveHeight(8),
                    height: responsiveHeight(200),
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                    {
                        (selectedImg == null && !image_url) && <View>
                            <Image source={browseImg} style={{ width: responsiveWidth(70), height: responsiveHeight(70), alignSelf: 'center' }} />
                            <Text style={{ color: COLORS.SHINE_BLUE, textAlign: 'center', fontWeight: '500', fontSize: respFontSize(12) }}>select or upload the image</Text>
                        </View>
                    }

                    {(selectedImg == null && image_url) && <Image source={{ uri: image_url }} style={{
                        height: responsiveHeight(190), resizeMode:
                            'contain'
                    }} />}
                    {selectedImg != null && <Image source={{ uri: selectedImg?.assets[0].uri }} style={{ height: responsiveHeight(190), resizeMode: 'contain' }} />}


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


