import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categories } from '../../utils/dataObjects'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS, ROUTE } from '../../constants'
import { useNavigation } from '@react-navigation/native'
type Props = {}

export const HomeCategory = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Shop by category</Text>
    <View style={styles.categoriesContainer}>
      {categories &&
        categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => {
              navigation.navigate(ROUTE.CATEGORIESDETAILS as never)
            }}
            style={styles.categoryItem}
          >
             <View>
                <View style={styles.imgContainer}>
                <Image source={ category.image } style={styles.categoryImage} />
                </View>
            
            <Text style={styles.name}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      marginLeft:responsiveWidth(8),

    },
    title: {
      fontSize: respFontSize(17),
      fontWeight: 'bold',
      marginBottom: responsiveHeight(8),
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  
    },
    categoryItem: {
      width: responsiveWidth(97), 
      height: responsiveHeight(145),
      marginRight:responsiveWidth(8),
      overflow: 'hidden',
    },
    imgContainer:{
      backgroundColor:COLORS.SEAGREEN,
      height: responsiveHeight(90),
      borderRadius: responsiveHeight(12),
      justifyContent:'center',
      alignItems:'center',
      marginBottom:responsiveHeight(4),
    },
    categoryImage: {
      
      width: responsiveWidth(75),
      height: responsiveHeight(50), 
    },
    name:{
        textAlign:'center',
        fontWeight:'400',
        fontSize:respFontSize(12),
        
    }
  });

