import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Image, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { CustomDropdown } from "../CustomDropdown";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { addProductApi, getAllCategoryListApi, getSpecificSubcategoriesListApi } from "../../services/commonApis";
import { useAppSelector } from "../../redux/hooks";
import { AdminInput } from "../AdminInputs";
import { AdminImageInput } from "../AdminImageInput";
import { COLORS } from "../../constants";
import { addProduct, cancel } from "../../assets";
import { VariantModal } from "../VariantModal";
import axios from "axios";
import Toast from "react-native-toast-message";
type Props = {};
export const AdminAddProduct = (props: Props) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState(null);
    const [subCategoryList, setSubCategoryList] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [productName, setProductName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [productDetail, setProductDetail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [variantDetail, setVariantDetail] = useState([]);
    const [variantModalVisible, setVariantModalVisible] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState<any>();
    const [isEdited, setIsEdited] = useState(false);
    const { token } = useAppSelector(state => state.user.user);
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
    useEffect(() => {
        setSelectedSubCategory(null);
        if (selectedCategory != null) {
            setSubCategoryList(null);
            getSubCategory();
        }
    }, [selectedCategory?._id])
    useEffect(() => {
        getCategory();
    }, []);
    const removeVariant = (deleteIndex: any) => {
        const newArray = variantDetail.filter((i, index) => { return index != deleteIndex });
        setVariantDetail(newArray);
    }
    const handleAddProduct = async () => {
        if (productName != '' && selectedImage != null && companyName != '' && productDetail != '' && selectedSubCategory != null && variantDetail.length > 0) {
            const dataObject = {
                "name": productName,
                "image": `${selectedImage?.assets[0].base64}`,
                "company_name": companyName,
                "product_description": productDetail,
                "number_of_variants": variantDetail.length.toString(),
                "subcategory_id": selectedSubCategory._id,
                "variants": variantDetail
            };
            console.log(dataObject);
            setIsLoading(true);
            const response = await addProductApi({
                payload: dataObject, accessToken: token
            });
            console.log("dsjkfnkljg", response);
            if (response.status == 200) {
                setProductName('');
                setCompanyName('');
                setVariantDetail([]);
                setProductDetail('');
                setSelectedSubCategory(null);
                setSelectedImage(null);
                setIsLoading(false);
                Toast.show({
                    type: "success",
                    text1: "product added successfully"
                })
            }
            else {
                setIsLoading(false);
                // console.log(response.data);
                Toast.show({
                    type: "error",
                    text1: "product not added"
                })
            }
        }
        else {
            Alert.alert("Please fill all details");
            return;
        }
    }
    return (
        <>
            <ScrollView style={{ marginTop: responsiveHeight(20), marginBottom: responsiveHeight(30) }} showsVerticalScrollIndicator={false}>
                <Text style={styles.headerTxt}>Product information :-</Text>
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
                <AdminInput
                    inputTitle="Product Name"
                    placeholderTxt="Desi ghee"
                    value={productName}
                    setValue={setProductName}
                />
                <AdminImageInput
                    selectedImg={selectedImage}
                    setSelectedImg={setSelectedImage}
                />
                <AdminInput
                    inputTitle="Company Name"
                    placeholderTxt="Amul"
                    value={companyName}
                    setValue={setCompanyName}
                />
                <Text style={styles.txtInputHeader}>Product Description</Text>
                <TextInput
                    value={productDetail}
                    onChangeText={setProductDetail}
                    selectionColor={COLORS.BLACK}
                    placeholder="Amul Desi ghee is india's no.1 ghee..."
                    style={styles.txtInput}
                    maxLength={400}
                    multiline={true}
                    numberOfLines={10}
                />
                <Text style={styles.txtInputHeader}>Add Variants</Text>
                {
                    variantDetail.length > 0 &&
                    <View>
                        {
                            variantDetail.map((item, index) => <View key={index} style={{ flexDirection: 'row', marginHorizontal: responsiveWidth(8), marginBottom: responsiveHeight(10), alignItems: 'center', gap: 4 }}>
                                <Text  >{index + 1}. </Text>
                                <Pressable style={{ justifyContent: 'space-between', flexDirection: 'row', backgroundColor: COLORS.GREY, width: "90%", paddingVertical: responsiveHeight(8), paddingLeft: responsiveWidth(8), borderRadius: responsiveWidth(8), }}
                                    onPress={() => {
                                        const obj = { variantDetail, index }
                                        setSelectedVariant(obj);
                                        setIsEdited(true);
                                        setVariantModalVisible(true);

                                    }}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Unit: </Text>
                                        <Text style={{ fontWeight: '700' }}>{item.units} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>Quantity: </Text>
                                        <Text style={{ fontWeight: '700' }}>{item.total_quantity} </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text>MRP: </Text>
                                        <Text style={{ fontWeight: '700' }}>{item.max_retail_price}  </Text>
                                    </View>




                                </Pressable>
                                <Pressable onPress={() => { removeVariant(index); }}>
                                    <Image source={cancel} style={{ width: responsiveWidth(20), height: responsiveWidth(20), tintColor: COLORS.TRANSPARENT }} />
                                </Pressable>
                            </View>)
                        }
                    </View>
                }
                <Pressable style={styles.addVariantView} onPress={() => setVariantModalVisible(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={addProduct} style={{ width: responsiveWidth(30), height: responsiveWidth(30), resizeMode: 'contain' }} />
                        <Text style={{ fontWeight: '500', fontSize: respFontSize(13) }}>Add variant</Text>
                    </View>
                </Pressable>
                {
                    isLoading ? <Pressable style={{
                        backgroundColor: COLORS.DARK_BLUE,
                        marginHorizontal: responsiveWidth(8),
                        borderRadius: responsiveHeight(8),
                        paddingVertical: responsiveHeight(10),
                        marginTop: responsiveHeight(40)
                    }} >
                        <ActivityIndicator size='small' color={COLORS.WHITE} />
                    </Pressable> :
                        <Pressable style={{
                            backgroundColor: COLORS.DARK_BLUE,
                            marginHorizontal: responsiveWidth(8),
                            borderRadius: responsiveHeight(8),
                            paddingVertical: responsiveHeight(10),
                            marginTop: responsiveHeight(40)
                        }}
                            onPress={() => handleAddProduct()} >
                            <Text style={{ color: COLORS.WHITE, textAlign: 'center', fontWeight: '700', fontSize: respFontSize(14) }}>Save</Text>
                        </Pressable>
                }
            </ScrollView >
            <Modal
                transparent
                visible={variantModalVisible}
                onRequestClose={() => setVariantModalVisible(false)}>
                <VariantModal setModalVisible={setVariantModalVisible} setVariantDetail={setVariantDetail} isEdited={isEdited} setIsEdited={setIsEdited} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} />
            </Modal>
        </>
    );
};
const styles = StyleSheet.create({
    headerTxt: {
        fontWeight: '600',
        fontSize: respFontSize(15),
        marginVertical: responsiveHeight(6),
        marginLeft: responsiveWidth(8),
        marginBottom: responsiveHeight(10),
    },
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
        paddingVertical: responsiveHeight(10),

    },
    addVariantView: {
        borderWidth: 1,
        borderColor: COLORS.DARKGREY,
        borderRadius: responsiveHeight(6),
        marginHorizontal: responsiveWidth(8),
        paddingHorizontal: responsiveWidth(8),
        paddingVertical: responsiveHeight(10),

    },
    addVariantTxt: {
        textAlign: 'center',
    },
})