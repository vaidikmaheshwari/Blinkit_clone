import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import React from "react";
import { productList } from "../../utils/dataObjects";
import { ProductCard } from "../ProductCard";
import { respFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveFunctions";
import { COLORS } from "../../constants";

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
type Props = {
  setProductDetailModalVisible?: React.Dispatch<React.SetStateAction<boolean>>,
  setProductDetailData?: React.Dispatch<React.SetStateAction<ProductType>> | any,
}
export function HomeFeature({ setProductDetailData, setProductDetailModalVisible }: Props) {

  return (
    <View style={styles.container}>
      <View style={styles.featureContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>From the house of Coca-cola</Text>
          <TouchableOpacity
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productsContainer}
        data={productList.slice(0, 5)}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item: any) => item.id}
      //   ItemSeparatorComponent={()=><View style={{width:responsiveWidth(10)}}></View>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //   paddingBottom: responsiveHeight(16),
  },
  featureContainer: {
    //   marginBottom: responsiveHeight(16),

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
  },
  title: {
    fontSize: respFontSize(17),
    fontWeight: 'bold',
  },
  seeAll: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
  productsContainer: {
    flexDirection: 'row',
    paddingRight: responsiveWidth(16),
  },
  productCardContainer: {
    marginRight: responsiveWidth(16),
  },
});

