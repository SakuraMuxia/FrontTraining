import { createSlice } from "@reduxjs/toolkit";
import {nanoid} from 'nanoid'
const goodsSlice = createSlice({
    name:'goods',
    initialState:{
        goods: [] // {id:1, gname:'华为手机',price:2000}
    },
    reducers:{
        addGoods(state,{payload}){
            state.goods = [...state.goods,{id:nanoid(),...payload}]
        }
    }
})

export const { addGoods } = goodsSlice.actions;
export default goodsSlice.reducer