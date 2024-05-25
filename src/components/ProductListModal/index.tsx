import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Pressable, Animated, PanResponder, Dimensions, FlatList, Modal, StatusBar } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../../constants';
import { cancel, cancelIcon } from '../../assets';
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight } from '../../utils/responsiveFunctions';
import { SearchResultItemListComponent } from '../SearchResultItemListComponent';
import { DeliveryFooter } from '../DeliveryFooter';
import { SearchResultComponent } from '../SearchResultComponent';
import { productList } from '../../utils/dataObjects';
import { LargeProductCard } from '../LargeProductCard';
import { CartProductModal } from '../CartProductModal';
import { closeModal, closeProductModal } from '../../redux/slices/cartModalSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ProductDetailModal } from '../ProductDetailModal';

type Props = {
  productListData: {
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
    }[]
  } | any;

}

export const ProductListModal = ({ productListData, setProductModalVisible }: any) => {
  // console.log("Hello", productListData?.bestSeller);
  const touchThreshold = 20;
  const pan = useRef(new Animated.ValueXY()).current;
  const dispatch = useAppDispatch();
  const cartProductModalVisible = useAppSelector((state) => state.cartProductModal.cartProductModalVisible)

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const { dx, dy } = gestureState;

      return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
    },
    onPanResponderMove: Animated.event(
      [
        null,
        { dy: pan.y }
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        setProductModalVisible(false);
      } else {

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false
        }).start();

      }
    }
  });
  return (
    <>
      <View style={[styles.modalView]}
      >
        <Animated.View style={[styles.container,
        {
          transform: [{ translateY: pan.y }]
        }

        ]}
        // {...panResponder.panHandlers}
        >

          <View style={styles.imageView}>
            <Pressable onPress={() => setProductModalVisible(false)}>
              <View style={styles.imageBGcontainer}>
                <Image source={cancelIcon} style={styles.image} />
              </View>

            </Pressable>
          </View>
          <FlatList
            style={{ marginTop: responsiveHeight(30) }}
            showsVerticalScrollIndicator={false}
            bounces={false}
            ListHeaderComponent={<View style={styles.headerView}>
              <Text style={styles.headerTxt}>{productListData?.bestSeller?.name}</Text>
              <Pressable ><Text style={styles.btnTxt}>see all</Text></Pressable>
            </View>}
            data={productList}
            renderItem={({ item }) =>
              <View style={{ marginLeft: responsiveWidth(6) }}><LargeProductCard item={item} width={responsiveWidth(190)} /></View>}
            numColumns={2}
            ListFooterComponent={<View style={{ paddingTop: responsiveHeight(200) }}></View>}

          />
          <View style={styles.footer}>
            <DeliveryFooter productDetailModalVisible={false} productListModal={true} setProductListModal={setProductModalVisible} />
          </View>
        </Animated.View>


      </View>
      <Modal
        visible={cartProductModalVisible}
        transparent={true}

        onRequestClose={() => {
          dispatch(closeModal());
          // setCartProductModalVisible(false)
        }}>
        {/* <Text style={{ fontSize: 100 }}>Hellooooo</Text> */}
        <CartProductModal setProductListModal={setProductModalVisible} productListModal={true} />

      </Modal>

    </>
  )
}
const styles = StyleSheet.create({

  modalView: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },
  container: {
    marginTop: responsiveHeight(120),
    backgroundColor: COLORS.SKY_BLUE,
    height: screenHeight - responsiveHeight(120),
    borderTopLeftRadius: responsiveHeight(20),
    borderTopRightRadius: responsiveHeight(20),
  },
  imageView: {
    marginTop: -responsiveHeight(60),
  },
  imageBGcontainer: {
    backgroundColor: COLORS.BLACK,
    width: responsiveWidth(50),
    height: responsiveHeight(50),
    borderRadius: responsiveHeight(25),
    marginLeft: responsiveWidth(190),
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    zIndex: 30,
    width: responsiveWidth(44),
    height: responsiveHeight(44),
    tintColor: COLORS.WHITE
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: responsiveWidth(8),
    marginBottom: responsiveHeight(12),
  },
  headerTxt: {
    fontSize: respFontSize(14),
    fontWeight: 'bold',
  },
  btnTxt: {
    color: COLORS.GREEN,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: responsiveHeight(20),
    backgroundColor: COLORS.WHITE,
    width: "100%"
  }
})
