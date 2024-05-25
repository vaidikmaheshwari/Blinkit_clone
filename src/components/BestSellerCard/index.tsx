import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { respFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveFunctions';
import { COLORS } from '../../constants';
import { ProductListModal } from '../ProductListModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeProductModal, openProductModal } from '../../redux/slices/cartModalSlice';
type Photo = any;
interface Product {
  id: number;
  name: string;
  quantity: string;
  price: string;
  photos: Photo[];
  itemDetails: string;
}
interface Category {
  bestSeller: {
    id: number;
    totalProducts: number;
    name: string;
    products: Product[];
  }

}



export const BestSellerCard = (bestSeller: Category) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  // const productListModal = useAppSelector((state) => state.cartProductModal.productListModalVisible)
  const [productModalData, setProductModalData] = useState<any>();
  return (
    <>
      <Pressable style={styles.container} onPress={() => {
        // dispatch(openProductModal());
        setProductModalVisible(true);
        setProductModalData(bestSeller);
      }}>
        <View style={styles.thumbnailContainer}>

          {bestSeller.bestSeller.products.slice(0, 3).map((product, index) => (
            <View key={index} style={styles.imagecontainer}>

              <Image
                source={product.photos[0]}
                style={styles.thumbnailImage}
              />
            </View>
          ))}
          <View style={styles.overlayContainer}>
            <Text style={styles.overlayText}>
              +{bestSeller.bestSeller.totalProducts - 3}
            </Text>
          </View>
        </View>
        <Text style={styles.name}>{bestSeller.bestSeller.name}</Text>
        <Text style={styles.productCount}>{bestSeller.bestSeller.totalProducts} Products</Text>
        <View style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>see all</Text>
        </View>
      </Pressable>
      <Modal
        //  animationType="slide"
        transparent={true}
        visible={productModalVisible}
        onRequestClose={() => {
          setProductModalVisible(false);
        }}>
        <ProductListModal productListData={productModalData} setProductModalVisible={setProductModalVisible} />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: responsiveHeight(10),
    flex: 1,
    height: responsiveHeight(240),
  },

  thumbnailContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: responsiveWidth(115),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SEAGREEN,
    padding: 2,
    borderRadius: responsiveHeight(10),
  },
  imagecontainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    borderRadius: responsiveHeight(12),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  thumbnailImage: {
    width: responsiveWidth(35),
    height: responsiveHeight(35),
  },
  overlayContainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    borderRadius: responsiveHeight(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  overlayText: {
    color: COLORS.DARKGREY,
    fontSize: respFontSize(16),
    fontWeight: 'bold',
    borderRadius: responsiveHeight(25),
  },
  name: {
    marginTop: responsiveHeight(3),
    width: responsiveHeight(115),
    fontWeight: '500',
    fontSize: respFontSize(12),
  },
  productCount: {
    color: COLORS.LIGHT_BLACK,
    marginTop: responsiveHeight(5),
  },
  seeAllButton: {
    width: "100%",
    position: 'absolute',
    bottom: 0,
    paddingVertical: responsiveHeight(8),
    paddingHorizontal: responsiveWidth(10),
    borderWidth: 2,
    borderColor: COLORS.LIGHT_GREY,
    borderRadius: responsiveHeight(8),
    marginTop: responsiveHeight(10),
  },
  seeAllText: {
    color: COLORS.GREEN,
    textAlign: 'center',
    fontWeight: 'bold',

  },
});

