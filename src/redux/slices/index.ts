import {combineReducers,} from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import cartProductModalReducer from './cartModalSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice'
import localisationReducer from './localisationSlice'
export const RootReducer = combineReducers({
   cart: cartReducer,
   cartProductModal:cartProductModalReducer,
   order:orderReducer,
   user:userReducer,
   localisation:localisationReducer
});
