import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions';
import { COLORS } from '../../constants';

type Props = {
    categoryDetail:{
        id: number;
    name: string;
    image: any;
    subCategory: {
        id: number;
        name: string;
        image: any;
    }[];
    }
}

export const SubCategoryComponent = ({categoryDetail}: Props) => {
  return (
    <View>
        <Text style={styles.title}>{categoryDetail.name}</Text>
        <View style={styles.subCategoryList}>
            {
                categoryDetail.subCategory.map(item=><Pressable key={item.id} style={styles.subCategoryContainer}>
                    <View style={styles.subCategoryImageContainer}>
                    <Image source={item.image} style={styles.subCategoryImage}/>

                    </View>
                    
                    <Text>{item.name}</Text>
                </Pressable>)
            }
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    title:{
        fontWeight: '600',
        fontSize:respFontSize(14),
        marginBottom:responsiveHeight(12), 
        marginTop:responsiveHeight(12),
    },
    subCategoryList:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subCategoryContainer:{
        marginRight:responsiveWidth(13),
        marginBottom:responsiveHeight(13),
    },
    subCategoryImageContainer:{
        width: responsiveWidth(90),
        height: responsiveHeight(90),
        borderRadius:responsiveHeight(12),
        backgroundColor:COLORS.LIGHT_GREY
    },
    subCategoryImage:{
        width: responsiveWidth(90),
        height: responsiveHeight(90),
    }
})
