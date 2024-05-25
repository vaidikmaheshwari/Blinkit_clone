import { View, Text, KeyboardAvoidingView, Platform, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomModal } from "../CustomModal";
import { AdminImageInput } from "../AdminImageInput";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { respFontSize, responsiveHeight, responsiveWidth, screenWidth } from "../../utils/responsiveFunctions";
import { AdminInput } from "../AdminInputs";
import { COLORS } from "../../constants";
import { CustomDropdown } from "../CustomDropdown";
import { VariantImageInput } from "../VariantImageInput";
import Toast from "react-native-toast-message";

type Props = {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setVariantDetail: React.Dispatch<React.SetStateAction<any>>;
    isEdited?: boolean;
    setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
    selectedVariant?: any;
    setSelectedVariant?: React.Dispatch<React.SetStateAction<any>>;

};

export const VariantModal = ({ setModalVisible, setVariantDetail, isEdited, setIsEdited, selectedVariant, setSelectedVariant }: Props) => {
    // console.log(selectedVariant);
    const discountList = [{ name: "Yes", _id: "1" }, { name: "No", _id: "2" }];
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);
    const [selectedImage4, setSelectedImage4] = useState(null);
    const [selectedImage5, setSelectedImage5] = useState(null);
    const editDiscountValue = isEdited == true ? (selectedVariant.variantDetail[selectedVariant.index].discount_available == true ? discountList[0] : discountList[1]) : discountList[1];
    const [mrp, setmrp] = useState(isEdited == true ? selectedVariant.variantDetail[selectedVariant.index].max_retail_price : '');
    const [discountAvailable, setDiscountAvailable] = useState(isEdited == true ? editDiscountValue : discountList[0]);
    const [discountPrice, setDiscountPrice] = useState(isEdited == true ? selectedVariant.variantDetail[selectedVariant.index].discount_price : '');
    const [discountPercentage, setDiscountPercentage] = useState(isEdited == true ? selectedVariant.variantDetail[selectedVariant.index]?.discount_percentage : '');
    const [units, setUnits] = useState(isEdited == true ? selectedVariant.variantDetail[selectedVariant.index].units : '');
    const [isLoading, setIsLoading] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(isEdited == true ? selectedVariant.variantDetail[selectedVariant.index].total_quantity : '');

    const calculateDiscountPercentage = (actualPrice: number, discountedPrice: number): any => {
        console.log(actualPrice, discountPrice);
        const discountAmount = actualPrice - discountedPrice;
        if (discountAmount < 0) {
            setDiscountPercentage('0');
            return;
        }
        const discountPercentage = (discountAmount / actualPrice) * 100;
        console.log(discountPercentage);
        setDiscountPercentage(String(discountPercentage.toPrecision(2)));
        // return discountPercentage;
    };
    useEffect(() => {
        if (discountPrice != '' && mrp != '') {
            const actualPrice = parseInt(mrp);
            const discountedPrice = parseInt(discountPrice);

            calculateDiscountPercentage(actualPrice, discountedPrice);
        }
    }, [mrp, discountPrice])
    const handleAddVariant = () => {
        // console.log(selectedImage1, selectedImage2, selectedImage3, selectedImage4, selectedImage5);

        if (selectedImage1 == null && selectedImage2 == null && selectedImage3 == null && selectedImage4 == null && selectedImage5 == null) {
            Alert.alert('Please fill all the details');
            return;
        }
        if (mrp == '' && units == '' && totalQuantity == '') {
            Alert.alert('Please fill all the details');
            return;
        }
        if (discountAvailable._id == '1' && discountPrice === '') {
            Alert.alert('Please fill all the details');
            return;
        }
        console.log("HEllo");
        let images = [];
        if (selectedImage1) images.push(selectedImage1?.assets[0].base64);
        if (selectedImage2) images.push(selectedImage2?.assets[0].base64);
        if (selectedImage3) images.push(selectedImage3?.assets[0].base64);
        if (selectedImage4) images.push(selectedImage4?.assets[0].base64);
        if (selectedImage5) images.push(selectedImage5?.assets[0].base64);
        if (discountAvailable._id == '1') {
            if (parseInt(mrp) < parseInt(discountPrice)) {
                Alert.alert("discount price is always smaller than actual mrp");
                return;
            }
            const dataObject = {
                "images": images,
                "max_retail_price": mrp,
                "total_quantity": totalQuantity,
                "units": units,
                "discount_available": true,
                "discount_price": discountPrice,
                "discount_percentage": discountPercentage,
            }
            console.log("abcddknok", dataObject)
            setVariantDetail(prev => [...prev, dataObject]);
            setModalVisible(false);

        }
        else {
            const dataObject = {
                "images": images,
                "max_retail_price": mrp,
                "total_quantity": totalQuantity,
                "discount_available": false,
                "units": units
            }
            console.log("abcddknok", dataObject);
            setVariantDetail(prev => [...prev, dataObject]);
            setModalVisible(false)

        }
    }
    const editVaraint = () => {
        if (mrp == '' && units == '' && totalQuantity == '') {
            Alert.alert('Please fill all the details');
            return;
        }
        if (discountAvailable._id == '1' && discountPrice === '') {
            Alert.alert('Please fill all the details');
            return;
        }
        let image_urls = [];
        if (selectedImage1) image_urls.push(selectedImage1?.assets[0].base64);
        if (selectedImage2) image_urls.push(selectedImage2?.assets[0].base64);
        if (selectedImage3) image_urls.push(selectedImage3?.assets[0].base64);
        if (selectedImage4) image_urls.push(selectedImage4?.assets[0].base64);
        if (selectedImage5) image_urls.push(selectedImage5?.assets[0].base64);
        if (selectedVariant.variantDetail[selectedVariant.index].images[0] && selectedImage1 == null) {
            image_urls.push(selectedVariant.variantDetail[selectedVariant.index].images[0])
        }
        if (selectedVariant.variantDetail[selectedVariant.index].images.length > 1 && selectedImage2 == null) {
            image_urls.push(selectedVariant.variantDetail[selectedVariant.index].images[1])
        }
        if (selectedVariant.variantDetail[selectedVariant.index].images.length > 2 && selectedImage3 == null) {
            image_urls.push(selectedVariant.variantDetail[selectedVariant.index].images[2])
        }
        if (selectedVariant.variantDetail[selectedVariant.index].images.length > 3 && selectedImage4 == null) {
            image_urls.push(selectedVariant.variantDetail[selectedVariant.index].images[3])
        }
        if (selectedVariant.variantDetail[selectedVariant.index].images.length > 4 && selectedImage5 == null) {
            image_urls.push(selectedVariant.variantDetail[selectedVariant.index].images[4])
        }
        if (discountAvailable._id == '1') {
            if (parseInt(mrp) < parseInt(discountPrice)) {
                Alert.alert("discount price is always smaller than actual mrp");
                return;
            }
            const dataObject = {
                "images": image_urls,
                "max_retail_price": mrp,
                "total_quantity": totalQuantity,
                "units": units,
                "discount_available": true,
                "discount_price": discountPrice,
                "discount_percentage": discountPercentage,
            }
            console.log("abcddknok", dataObject)
            let arrray = selectedVariant.variantDetail
            arrray[selectedVariant.index] = dataObject
            setVariantDetail(arrray);
            setModalVisible(false);

        }
        else {
            const dataObject = {
                "images": image_urls,
                "max_retail_price": mrp,
                "total_quantity": totalQuantity,
                "discount_available": false,
                "units": units
            }
            console.log("abcddknok", dataObject);
            let arrray = selectedVariant.variantDetail
            arrray[selectedVariant.index] = dataObject
            setVariantDetail(arrray);
            setModalVisible(false)

        }
    }

    return (


        <CustomModal setModalVisible={setModalVisible} setIsEdited={setIsEdited}  >
            <ScrollView style={{ marginTop: responsiveHeight(20), marginBottom: responsiveHeight(30) }} showsVerticalScrollIndicator={false} >
                <Text style={styles.txtInputHeader}>Upload image</Text>
                <View style={{ flexDirection: 'row', width: screenWidth, flexWrap: 'wrap' }}>
                    <VariantImageInput selectedImg={selectedImage1} setSelectedImg={setSelectedImage1} image_url={isEdited == true && 'data:image;base64,' + selectedVariant.variantDetail[selectedVariant.index].images[0]} />
                    <VariantImageInput selectedImg={selectedImage2} setSelectedImg={setSelectedImage2} image_url={(isEdited == true && selectedVariant.variantDetail[selectedVariant.index].images.length > 1) && 'data:image;base64,' + selectedVariant.variantDetail[selectedVariant.index].images[1]} />
                    <VariantImageInput selectedImg={selectedImage3} setSelectedImg={setSelectedImage3} image_url={(isEdited == true && selectedVariant.variantDetail[selectedVariant.index].images.length > 2) && 'data:image;base64,' + selectedVariant.variantDetail[selectedVariant.index].images[2]} />
                    <VariantImageInput selectedImg={selectedImage4} setSelectedImg={setSelectedImage4} image_url={(isEdited == true && selectedVariant.variantDetail[selectedVariant.index].images.length > 3) && 'data:image;base64,' + selectedVariant.variantDetail[selectedVariant.index].images[3]} />
                    <VariantImageInput selectedImg={selectedImage5} setSelectedImg={setSelectedImage5} image_url={(isEdited == true && selectedVariant.variantDetail[selectedVariant.index].images.length > 4) && 'data:image;base64,' + selectedVariant.variantDetail[selectedVariant.index].images[4]} />
                </View>

                <AdminInput
                    inputTitle="Max Retail Price(MRP)"
                    placeholderTxt="50"
                    value={mrp}
                    setValue={setmrp}
                    keyboardtype="decimal-pad"
                />
                <Text style={styles.txtInputHeader}>Discount Percentage</Text>
                {
                    <CustomDropdown
                        list={discountList}
                        headingtxt="Discount Available"
                        selectedValue={discountAvailable}
                        setSelectedValue={setDiscountAvailable}
                    />
                }
                {
                    (discountAvailable && discountAvailable?._id == "1") && <View>
                        <AdminInput
                            inputTitle="Discount Price"
                            placeholderTxt="45"
                            value={discountPrice}
                            setValue={setDiscountPrice}
                            keyboardtype="decimal-pad"
                        />
                        <Text style={styles.txtInputHeader}>Discount Percentage</Text>
                        <Text style={styles.txtInput}>{(discountPrice && mrp) ? discountPercentage : 5}</Text>

                    </View>
                }


                <AdminInput
                    inputTitle="In 1 Unit"
                    placeholderTxt="750 ml / 1 kg / 1 unit"
                    value={units}
                    setValue={setUnits}
                />
                <AdminInput
                    inputTitle="Total Quantity"
                    placeholderTxt="100"
                    value={totalQuantity}
                    setValue={setTotalQuantity}
                    keyboardtype="decimal-pad"
                />
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
                            onPress={() => isEdited == true ? editVaraint() : handleAddVariant()}
                        >
                            <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontWeight: '700', fontSize: respFontSize(14) }}>Save</Text>
                        </Pressable>
                }

            </ScrollView>
        </CustomModal>

    );
};
const styles = StyleSheet.create({
    txtInputHeader: {
        fontWeight: '600',
        fontSize: respFontSize(14),
        marginLeft: responsiveWidth(8),
        marginVertical: responsiveHeight(8)
    },
    txtInput: {
        borderWidth: 0.4,
        borderColor: COLORS.DARKGREY,
        borderRadius: responsiveHeight(6),
        marginHorizontal: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(10)
    }
})


