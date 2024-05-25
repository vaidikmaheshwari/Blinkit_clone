import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { BestSellersList } from '../../utils/dataObjects'
import { BestSellerCard } from '../BestSellerCard'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions'
import { COLORS } from '../../constants'
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
type Props = {
  // setProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // setProductModalData: React.Dispatch<React.SetStateAction<item>> | any;
}


export const HomeBestSellers = ({ }: Props) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Best Sellers</Text>
        <Text style={styles.seeAllText}>see all</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.FlatListContent}
        data={BestSellersList}
        ListHeaderComponent={() => <View style={{ width: responsiveWidth(8) }}></View>}
        renderItem={({ item }) => {

          return (
            <View style={styles.cardContainer} key={item.id}

            >
              <BestSellerCard bestSeller={item} />
            </View>
          );
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: responsiveHeight(16),
    paddingBottom: responsiveHeight(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: responsiveWidth(8),
    marginRight: responsiveWidth(8),
    marginBottom: responsiveHeight(8),
  },
  headerText: {
    fontSize: respFontSize(18),
    fontWeight: 'bold',
  },
  seeAllText: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
  FlatListContent: {
    flexDirection: 'row',
    paddingRight: responsiveWidth(8),
  },
  cardContainer: {
    marginRight: responsiveWidth(8),

  },
});
