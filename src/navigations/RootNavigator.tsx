import { View, Text, Modal, Platform, NativeModules } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ROUTE } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesDetailsScreen from '../screens/CategoriesDetailScreen';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { closeModal } from '../redux/slices/cartModalSlice';
import { CartProductModal } from '../components/CartProductModal';
import ProfileScreen from '../screens/ProfileScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderSummary from '../screens/OrderSummary';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdminCategoryScreen from '../screens/AdminCategoryScreen';
import AdminSubCategoryScreen from '../screens/AdminSubCategoryScreen';
import AdminProductScreen from '../screens/AdminProductScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';
import { setEnglish, setHindi } from '../redux/slices/localisationSlice';

type Props = {}
const LoginStack = createNativeStackNavigator();
const LoginStackNavigatior = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name={ROUTE.SIGNUP} component={SignUpScreen} />
      <LoginStack.Screen name={ROUTE.SIGNIN} component={SignInScreen} />
    </LoginStack.Navigator>
  )
}
const UserStack = createNativeStackNavigator();
const UserStackNavigatior = () => {
  const dispatch = useAppDispatch();
  const cartProductModalVisible = useAppSelector(state => state.cartProductModal.cartProductModalVisible);
  return (
    <>
      <UserStack.Navigator screenOptions={{ headerShown: false }}>
        <UserStack.Screen name={ROUTE.HOME} component={HomeScreen} />
        <UserStack.Screen name={ROUTE.SEARCH} component={SearchScreen} />
        <UserStack.Screen name={ROUTE.CATEGORIES} component={CategoriesScreen} />
        <UserStack.Screen name={ROUTE.CATEGORIESDETAILS} component={CategoriesDetailsScreen} />
        <UserStack.Screen name={ROUTE.PROFILE} component={ProfileScreen} />
        <UserStack.Screen name={ROUTE.CHECKOUT} component={CheckOutScreen} />
        <UserStack.Screen name={ROUTE.ORDERS} component={OrderScreen} />
        <UserStack.Screen name={ROUTE.ORDERSUMMARY} component={OrderSummary} />
      </UserStack.Navigator>
      <Modal
        visible={cartProductModalVisible}
        transparent={true}

        onRequestClose={() => {
          dispatch(closeModal());
        }}>

        <CartProductModal />

      </Modal>
    </>
  )
}
const AdminDrawer = createDrawerNavigator();
const AdminDrawerNavigator = () => {
  return (
    <AdminDrawer.Navigator screenOptions={{ unmountOnBlur: true }}  >
      <AdminDrawer.Screen name={ROUTE.ADMIN_HOME} component={AdminHomeScreen} options={{ title: 'Home' }} />
      <AdminDrawer.Screen name={ROUTE.ADMIN_CATEGORY} component={AdminCategoryScreen} options={{ title: 'Category' }} />
      <AdminDrawer.Screen name={ROUTE.ADMIN_SUBCATEGORY} component={AdminSubCategoryScreen} options={{ title: 'Sub-Category' }} />
      <AdminDrawer.Screen name={ROUTE.ADMIN_PRODUCT} component={AdminProductScreen} options={{ title: 'Products' }} />
      <AdminDrawer.Screen name={ROUTE.ADMIN_SETTINGS} component={AdminSettingsScreen} options={{ title: 'Settings' }} />
    </AdminDrawer.Navigator>
  )
}
const Stack = createNativeStackNavigator();
const RootNavigator = (props: Props) => {
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const lang = () => {
    if (Platform.OS === 'ios') {
      const locale = NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0];
      console.log("heloidgfnos;", NativeModules.SettingsManager.settings);
      console.log(locale);
      if (locale.substring(0, 5) == 'hi_IN') {
        dispatch(setHindi({}));
      }
      else {
        dispatch(setEnglish({}));
      }
    }
  }
  useEffect(() => {
    lang();
  }, [])
  return (
    <NavigationContainer>
      {
        user == null ?
          <LoginStackNavigatior /> :
          user?.role == "USER" ?
            <UserStackNavigatior /> : <AdminDrawerNavigator />
      }

    </NavigationContainer>
  )
}

export default RootNavigator