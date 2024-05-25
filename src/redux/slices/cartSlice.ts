import {createSlice} from '@reduxjs/toolkit';
type CartProduct ={
   product_id:number,
   option_id:number,
   quantity:number,
   price:number,
}
type Cart={
    totalQuantity:number,
    totalPrice:number,
    cartProduct:CartProduct[],
}

const initialState :Cart= {
    cartProduct:[],
    totalQuantity:0,
    totalPrice:0,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   addProduct: (state,action) => {
    const {product_id,option_id,quantity,price}= action.payload;
    const existingProductIndex = state.cartProduct.findIndex(
        (p) => p.product_id === product_id && p.option_id === option_id
      );
      if (existingProductIndex != -1) {
        state.cartProduct[existingProductIndex].quantity += quantity;
        state.totalQuantity += quantity;
      state.totalPrice += quantity*price;
      } else {
        state.cartProduct.push({ product_id:product_id,option_id:option_id, quantity:quantity ,price:price});
        state.totalQuantity += quantity;
        state.totalPrice += quantity*price;
      }
    

   },
   removeProduct: (state, action) => {
    const { product_id,option_id, quantity } = action.payload;
    const existingProductIndex = state.cartProduct.findIndex(
      (p) => p.product_id === product_id && p.option_id === option_id
    );

    if (existingProductIndex !== -1) {
      state.totalQuantity -= 1;
      state.totalPrice -= state.cartProduct[existingProductIndex].price * 1;
      state.cartProduct[existingProductIndex].quantity-=1;
      if(state.cartProduct[existingProductIndex].quantity==0){
        state.cartProduct.splice(existingProductIndex, 1);
      }
    }
  },
  clearCart:(state)=>{
    state.cartProduct=[];
    state.totalPrice=0;
    state.totalQuantity=0;
  }
 
    
  
  },
});
export const {
  addProduct,removeProduct,clearCart
} = cartSlice.actions;
export default cartSlice.reducer;