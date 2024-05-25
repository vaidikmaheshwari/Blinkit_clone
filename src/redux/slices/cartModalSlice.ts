import {createSlice} from '@reduxjs/toolkit';


const initialState = {
   cartProductModalVisible:false,
   productListModalVisible:false,
};
const cartProductModalSlice = createSlice({
  name: 'cartProductModal',
  initialState,
  reducers: {
   toggleModal: (state) => {
    state.cartProductModalVisible=!state.cartProductModalVisible;
    console.log(state.cartProductModalVisible);
   },
  closeModal:(state)=>{state.cartProductModalVisible=false},
    // console.log(state.cartProductModalVisible);
  
  closeProductModal:(state)=>{  state.productListModalVisible=false},
  openProductModal:(state)=>{
    state.productListModalVisible=true
    // console.log(state.cartProductModalVisible);
  },

  
  },
});
export const {
 toggleModal,closeModal,closeProductModal,openProductModal
} = cartProductModalSlice.actions;
export default cartProductModalSlice.reducer;