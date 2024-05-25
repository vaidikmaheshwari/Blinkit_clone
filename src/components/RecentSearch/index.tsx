import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { respFontSize, responsiveHeight, responsiveWidth, screenWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { recentSearchList } from '../../utils/dataObjects'
import { search } from '../../assets'

type Props = {}

export const RecentSearch= (props: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.headerView}>
            <Text style ={styles.headerTxt}>Recent searches</Text>
            <Pressable ><Text style={styles.btnTxt}>clear</Text></Pressable>
        </View>
        <View style={styles.listContainer}>
            {
               recentSearchList.map((item,index)=>{
                return(
                  <Pressable key ={index} style={styles.itemContainer}>
                    <Image source = {search} style={{height:responsiveHeight(25),width:responsiveWidth(25)}}/>
                    <Text>{item}</Text>
                  </Pressable>
               )})
            }
        </View>
    </View>
  )
}
const styles =StyleSheet.create({
    container:{
       marginTop:responsiveHeight(18),
    },
    headerView:{
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginHorizontal:responsiveWidth(8),
    },
    headerTxt:{
        fontSize:respFontSize(14),
        fontWeight: 'bold',
    },
    btnTxt:{
        color:COLORS.GREEN,
        fontWeight: 'bold',
    },
    listContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:responsiveHeight(8),
        marginTop:responsiveHeight(8),
        marginLeft:responsiveWidth(8),
    },
    itemContainer:{
        flexDirection:'row',
        borderWidth:0.2,
        borderColor:COLORS.LIGHT_PENCIL,
        alignItems: 'center',
        paddingHorizontal:responsiveWidth(8),
        paddingVertical:responsiveHeight(4),
        marginRight:responsiveWidth(12),
        marginBottom:responsiveHeight(12),
        borderRadius:responsiveHeight(8),

    }
})
