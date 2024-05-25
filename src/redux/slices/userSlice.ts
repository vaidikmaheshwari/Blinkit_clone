import {createSlice} from '@reduxjs/toolkit';


const initialState = {
   user:null,
   isLoading :false,

};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   fetchLoginApi:(state,action)=>{
    state.isLoading = true;
   },
   successLoginApi:(state,action)=>{
    state.isLoading = false;
    state.user = action.payload;
   },
   failedLoginApi:(state,action)=>{
    state.isLoading = false;
   },
   logoutUser:(state,action)=>{
    state.user=null;
   }
  },
}); 
export const {
 fetchLoginApi, successLoginApi, failedLoginApi,logoutUser
} = userSlice.actions;
export default userSlice.reducer;