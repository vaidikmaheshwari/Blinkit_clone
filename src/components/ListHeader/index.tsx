import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { leftArrow, search } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import { COLORS, ROUTE } from '../../constants'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'

type Props = {
    headerTxt?: string
    rightImg?: boolean
}

export const ListHeader = ({ headerTxt, rightImg }: Props) => {
    const navigation = useNavigation();
    return (

        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.leftImageContainer}>
                    <Image source={leftArrow} style={styles.leftImage} />
                </Pressable>
                <Text style={styles.headerTxt}>{headerTxt}</Text>

            </View>
            {
                rightImg &&

                <Pressable onPress={() => navigation.navigate(ROUTE.SEARCH as never)} style={styles.rightImgContainer}>
                    <Image source={search} style={styles.rightImg} />
                </Pressable>
            }

        </View>



    )
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: responsiveWidth(12),
        flexDirection: 'row',
        paddingRight: responsiveWidth(12),
        justifyContent: 'space-between',
        height: responsiveHeight(44),
        paddingBottom: responsiveHeight(8),
        // borderBottomWidth: 0.3,
        backgroundColor: COLORS.WHITE,

        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    leftImageContainer: {
        width: responsiveWidth(28),
        height: responsiveHeight(20)
    },
    leftImage: {
        width: responsiveWidth(28),
        height: responsiveHeight(20)
    },
    headerTxt: {
        fontSize: respFontSize(14),
        fontWeight: '500'
    },
    rightImgContainer: {
        width: responsiveWidth(35),
        height: responsiveHeight(35)
    },
    rightImg: {
        width: responsiveWidth(35),
        height: responsiveHeight(35)
    },

})

