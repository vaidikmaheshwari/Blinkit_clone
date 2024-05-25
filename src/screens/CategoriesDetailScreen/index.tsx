import { View, Text, SafeAreaView, StyleSheet, StatusBar, Pressable, Image, FlatList, PanResponder, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { categoryDetailList } from '../../utils/dataObjects'
import { DeliveryFooter, LargeProductCard, ListHeader } from '../../components'
import { COLORS } from '../../constants'
import { respFontSize, responsiveHeight, responsiveWidth, screenHeight } from '../../utils/responsiveFunctions'


type ProductOption = {
  productName: string;
  photos: string[];
  discountPrize?: string;
  actualPrize: string;
  discountOff?: string;
  units: string;
  discountAvailable: boolean;
};

type Product = {
  id: number;
  deliveryTime: string;
  productName: string;
  photos: string[];
  discountAvailable: boolean;
  discountPrize?: string;
  actualPrize: string;
  discountOff?: string;
  units: string;
  companyName: string;
  optionsAvailable: boolean;
  options?: ProductOption[];
  productDetail: string;
};

type SubCategory = {
  id: number;
  subCategoryName: string;
  image: string; // Assuming the image is a URL or image path
  productList: Product[];
};

type Category = {
  id: number;
  categoryName: string;
  image: string; // Assuming the image is a URL or image path
  subCategory: SubCategory[];

};
const CategoriesDetailsScreen = () => {
  // console.log(categoryDetailList)
  const [activeSubCategoryId, setActiveSubCategoryId] = useState(1);
  const subCategoryflatlistRef = useRef();
  const flatListRef = useRef();
  const pan = useRef(new Animated.ValueXY()).current;
  const [activePan, setActivePan] = useState<boolean>(false);
  const touchThreshold = 20;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (e, gestureState) => {
      const { dx, dy } = gestureState;
      return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
    },
    onPanResponderMove: Animated.event(
      [
        null,
        { dy: activePan ? pan.y : new Animated.Value(0) }
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < 100) {
        // setProductDetailModalVisible(false);
        console.log('swipe down');
      } else {
        // Animated.spring(pan, {
        //   toValue: { x: 0, y: 0 },
        //   useNativeDriver: false
        // }).start();
      }
    }
  });
  // console.log("->>>>", flatListRef.current.getScrollResponder._handleScrollEndDrag());
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <View style={styles.container}>

          <ListHeader headerTxt={categoryDetailList[0].categoryName} rightImg={true} />
          <View style={styles.bodyContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={categoryDetailList[0].subCategory}
              ref={subCategoryflatlistRef}
              style={styles.leftFlatList}
              renderItem={({ item }) =>
                <Pressable onPress={() => {
                  setActiveSubCategoryId(item.id)
                }}>
                  <>
                    <View style={styles.categoryContainer}>
                      <View style={[styles.categoryImageContainer, {
                        backgroundColor: activeSubCategoryId == item.id ? COLORS.SEAGREEN : COLORS.GREY
                      }]}>
                        <Image source={item.image} style={styles.categoryImage} />
                      </View>
                      <Text style={[styles.categoryName, {
                        color: activeSubCategoryId == item.id ? COLORS.BLACK : COLORS.LIGHT_PENCIL,
                        fontWeight: activeSubCategoryId == item.id ? '600' : '500'
                      }]}>{item.subCategoryName}</Text>
                    </View>
                    {
                      item.id == activeSubCategoryId && <View style={styles.itemListFooter}></View>
                    }
                  </>
                </Pressable>
              }
              bounces={false}
              keyExtractor={(item: any) => item.id}
              ListFooterComponent={() => <View style={{ paddingBottom: 50 }}></View>}
            />

            <Animated.FlatList
              numColumns={2}
              showsVerticalScrollIndicator={false}
              data={categoryDetailList[0].subCategory[activeSubCategoryId - 1].productList}
              renderItem={({ item }) => {
                return (
                  <LargeProductCard item={item} width={responsiveHeight(150)} />
                )
              }
              }
              // {...panResponder.panHandlers}
              style={{ transform: [{ translateY: pan.y }] }}
              keyExtractor={(item: any) => item.id}
              bounces={false}
              ref={flatListRef}
              ListFooterComponent={() => <View style={{ paddingBottom: screenHeight - 800 }}></View>}
              onEndReachedThreshold={0.2}
              onEndReached={() => setActivePan(true)}
            />

          </View>
        </View>
        <View style={styles.footer}>
          <DeliveryFooter />
        </View>
      </SafeAreaView>
    </>
  )
}

export default CategoriesDetailsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,


  },
  bodyContainer: {
    backgroundColor: COLORS.SKY_BLUE,
    flex: 1,
    flexDirection: 'row',

  },
  leftFlatList: {
    backgroundColor: COLORS.WHITE,
    width: responsiveWidth(80),
  },
  categoryContainer: {
    height: responsiveHeight(110),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryImageContainer: {
    height: responsiveWidth(60),
    width: responsiveWidth(60),
    borderRadius: responsiveWidth(30),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  categoryImage: {
    height: responsiveHeight(55),
    width: responsiveWidth(55),
  },
  categoryName: {
    textAlign: 'center',
    width: "80%",
    fontSize: respFontSize(12),
    color: COLORS.LIGHT_PENCIL,
    marginTop: 2
  },
  itemListFooter: {
    width: responsiveHeight(5),
    backgroundColor: COLORS.GREEN,
    position: 'absolute',
    right: 0,
    height: responsiveHeight(110),
    marginRight: -responsiveWidth(2),
    borderRadius: responsiveHeight(2.5)
  },
  footer: {

    backgroundColor: COLORS.WHITE,
    width: "100%"
  }
})