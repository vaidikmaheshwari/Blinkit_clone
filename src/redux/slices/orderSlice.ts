import {createSlice} from '@reduxjs/toolkit';
interface CartProduct {
   product_id:number,
   option_id:number,
   quantity:number,
   price:number,
}
interface Order{
  orderId: string;
  orderDate: string;
  deliveryTime: string;
  orderStatus: string;
  paymentMode: string;
  totalPrice: string;
  totalQuantity: number;
  cartProduct: CartProduct[];

}
type OrderList= Order[]

const initialState : OrderList | any= {
    orderBook:[],
};
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   addOrder: (state,action) => {
     state.orderBook.push(action.payload);
    // console.log("Hello",action.payload)
    //  console.log("hello",state.orderBook);
   },
   
 
    
  
  },
});
export const {
  addOrder
} = orderSlice.actions;
export default orderSlice.reducer;