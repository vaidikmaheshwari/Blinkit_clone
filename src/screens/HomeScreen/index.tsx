import { View, Text, ScrollView, StyleSheet, SafeAreaView, Animated, Modal, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../../constants'

import { responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import {
  DeliveryFooter,
  HomeBestSellers,
  HomeFeature,
  HomeBrand,
  HomeCategory,
  HomeFooter,
  HomeHeader,
  HomeSearchBar,
  HomeShopByStore,
  ImageSwiper,
  CategoriesFooter,
  ProductListModal,
  ProductDetailModal
} from '../../components'
import Toast from 'react-native-toast-message'





type Props = {}
interface item {
  id: number;
  totalProducts: number;
  name: string;
  products: {
    id: number;
    name: string;
    quantity: string;
    price: string;
    photos: any[];
    itemDetails: string;
  }[];
}
type ProductOption = {
  productName: string;
  photos: string[];
  discountPrize?: string; // Assuming this can be optional
  actualPrize: string;
  discountOff?: string; // Assuming this can be optional
  units: string;
  discountAvailable: boolean;
};

type ProductType = {
  id: number;
  deliveryTime: string;
  productName: string;
  photos: string[];
  discountAvailable: boolean;
  discountPrize: string;
  actualPrize: string;
  discountOff: string;
  units: string;
  companyName: string;
  optionsAvailable: boolean;
  options?: ProductOption[]; // Assuming options can be optional
  productDetail: string;
};
const HomeScreen = (props: Props) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>


          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[1]}
            bounces={false}


          >
            <HomeHeader />
            <HomeSearchBar />
            <HomeBestSellers />
            <ImageSwiper />
            <HomeCategory />
            <HomeShopByStore />
            <HomeFeature />
            <HomeBrand />
            <HomeFooter />
          </ScrollView>
          <View>
            <CategoriesFooter />
            <View >
              <DeliveryFooter />
            </View>


          </View>
        </View>
      </SafeAreaView>
    </>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  header: {
    paddingBottom: responsiveHeight(8),
    position: 'absolute',
    paddingTop: responsiveHeight(60),
    width: responsiveWidth(430),
    zIndex: 300,
    backgroundColor: COLORS.WHITE
  }

})