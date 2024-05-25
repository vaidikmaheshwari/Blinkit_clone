import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
import { storeByData } from '../../utils/dataObjects'

type Props = {}

export const DiscoverBrands = (props: Props) => {
  return (
    <View >
       <View style={styles.headerView}>
            <Text style ={styles.headerTxt}>Discover new finds</Text>
        </View>
        <FlatList
         data={storeByData}
         horizontal
         style={styles.flatlist}
         showsHorizontalScrollIndicator={false}
         renderItem={({item})=>
        <View>
          <Image source={{uri:item.image}} style={styles.image}/>
        </View>}
        keyExtractor={(item:any)=>item.id}
        />
    </View>
  )
}
const styles =StyleSheet.create({
    
    headerView:{
       marginHorizontal:responsiveWidth(8),
    },
    headerTxt:{
        fontSize:respFontSize(14),
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

    },
    flatlist: {
        marginVertical:responsiveHeight(14),
    },
    image:{
        height:responsiveHeight(160),
        width:responsiveWidth(115),
        borderRadius:responsiveHeight(10),
        marginLeft:responsiveWidth(10),
    }
})

