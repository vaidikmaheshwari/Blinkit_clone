import {createSlice} from '@reduxjs/toolkit';

import { EnglishString, HindiString } from '../../utils/localisationString';

const initialState = {
   langString:EnglishString,
   isHindi:false

};
const localisationSlice = createSlice({
  name: 'localisation',
  initialState,
  reducers: {
   setHindi:(state,action)=>{
    state.langString=HindiString;
    state.isHindi=true;
   },
   setEnglish:(state,action)=>{
    state.langString=EnglishString;
    state.isHindi=false;
   },
  },
}); 
export const {
    setHindi,setEnglish
} = localisationSlice.actions;
export default localisationSlice.reducer;