

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { brandsList } from '../../utils/dataObjects';
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions';
import { COLORS } from '../../constants';

export const HomeBrand = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by brand</Text>
       <View style={styles.listContainer}>
        {
          brandsList.map((brand) => {
            return (
              <View style={{flexDirection:'column'}} key={brand.id}>
              <TouchableOpacity
           
                style={styles.brandContainer}
              >
                <Image
                  source={ brand.BrandImage }
                  alt={brand.brandname}
                  style={styles.image}
                />
              </TouchableOpacity>
              <Text style={styles.txt}>{brand.brandname}</Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:responsiveHeight(12),
    marginBottom: responsiveHeight(12),
  },
  title: {
    fontSize: respFontSize(17),
    fontWeight: '600',
    marginBottom: responsiveHeight(8),
    marginLeft: responsiveWidth(8),
  },
  listContainer:{
    flexDirection: 'row',
    flexWrap:'wrap',
    marginLeft: responsiveWidth(8),
  },
  scrollContainer: {
    paddingRight: responsiveWidth(16),
  },
  brandContainer: {
    width:responsiveWidth(198),
    height:responsiveHeight(110),
    backgroundColor:COLORS.LIGHT_BLUE,
    marginRight: responsiveWidth(12),
    alignItems: 'center',
    marginBottom:responsiveHeight(4),
    borderRadius:responsiveHeight(12),
  },
  
  image: {
    width: responsiveWidth(140),
    height: responsiveHeight(80),
    position: 'absolute',
    bottom:responsiveHeight(10),
    
    borderRadius: responsiveHeight(8),
    // marginBottom:responsiveHeight(16),
  },
  txt:{
    color:COLORS.BLACK,
    fontSize:respFontSize(12),
    textAlign:'center',
    marginBottom:responsiveHeight(12),
    fontWeight:'500',
    
  }
  
});

