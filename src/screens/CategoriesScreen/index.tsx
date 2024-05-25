import { View, Text, FlatList, StyleSheet, Image, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { allCategoriesList } from '../../utils/dataObjects'
import { leftArrow } from '../../assets'
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { DeliveryFooter, SubCategoryComponent } from '../../components'

type Props = {}

const CategoriesScreen = (props: Props) => {
    const [activeid, setActiveid] = useState(1);
    const navigation = useNavigation();
    const flatListRef = useRef(null);
    const firstFlatListRef = useRef(null);
    const scrollToIndex = (index: number) => {
        flatListRef.current.scrollToIndex({ animated: true, index });
    };
    const ItemScrollToIndex = (index: any) => {
        firstFlatListRef.current.scrollToIndex({ animated: false, index });
    };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Pressable style={styles.leftImageContainer} onPress={() => navigation.goBack()}>
                        <Image source={leftArrow} style={styles.leftImage} />
                    </Pressable>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={allCategoriesList}
                        ref={firstFlatListRef}
                        renderItem={({ item }) =>
                            <Pressable onPress={() => {
                                scrollToIndex(item.id - 1);
                            }}>
                                <View style={[styles.categoryContainer, { backgroundColor: activeid == item.id ? COLORS.WHITE : COLORS.SEAGREEN, }]}>
                                    <Image source={item.image} style={styles.categoryImage} />
                                    <Text style={[styles.categoryName, {
                                        color: activeid != item.id ? COLORS.LIGHT_PENCIL : COLORS.BLACK,
                                        fontWeight: activeid == item.id ? '500' : '400'
                                    }]}>{item.name}</Text>
                                </View>
                            </Pressable>
                        }


                        bounces={false}
                        keyExtractor={(item: any) => item.id}
                        ListFooterComponent={() => <View style={{ paddingBottom: 200, backgroundColor: COLORS.SEAGREEN }}></View>}
                    />
                </View>
                <View style={styles.rightContainer}>
                    <View style={{ marginTop: responsiveHeight(60) }}></View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={allCategoriesList}
                        renderItem={({ item }) => {
                            return (
                                <SubCategoryComponent categoryDetail={item} />
                            )
                        }
                        }
                        keyExtractor={(item: any) => item.id}
                        bounces={false}
                        ref={flatListRef}
                        ListFooterComponent={() => <View style={{ paddingBottom: screenHeight - 100 }}></View>}
                        onViewableItemsChanged={({ viewableItems, changed }) => {
                            setActiveid(viewableItems[0].item.id);
                            ItemScrollToIndex(viewableItems[0].index)

                        }}
                    />
                </View>


            </View>
            <View style={{ position: 'absolute', bottom: 0, width: "101%", paddingBottom: responsiveWidth(10), backgroundColor: COLORS.WHITE }}>
                <DeliveryFooter />
            </View>
        </>
    )
}
export default CategoriesScreen;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        width: responsiveWidth(90),

    },
    leftImageContainer: {
        backgroundColor: COLORS.SEAGREEN,
        alignItems: 'center',
    },
    leftImage: {
        height: responsiveHeight(18),
        width: responsiveWidth(25),
        marginTop: responsiveHeight(70),
        marginBottom: responsiveHeight(20),
    },
    categoryContainer: {
        height: responsiveHeight(140),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryImage: {
        height: responsiveHeight(90),
        width: responsiveWidth(80)
    },
    categoryName: {
        textAlign: 'center',
        width: "90%",
        fontSize: respFontSize(12),

    },
    rightContainer: {
        backgroundColor: COLORS.WHITE,
        flex: 1,
        paddingLeft: responsiveWidth(20),
    }
})