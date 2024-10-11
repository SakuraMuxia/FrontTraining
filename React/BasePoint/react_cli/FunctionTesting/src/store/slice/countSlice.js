import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const countSlice = createSlice({
    name:'count',
    initialState:{
        num:88
    },
    // 同步的reducer
    reducers:{
        // 加操作
        addNum(state,{payload}){
            state.num += payload
        },
        // 减操作
        decNum(state,{payload}){
            state.num -= payload
        }
    },
    // 异步reducer
    extraReducers: (builder)=>{
        builder
            .addCase(asyncAddNum.pending,(state,action)=>{
                console.log('pending action: ', action);
            })
            // action对象的payload属性接收成功的PromiseResult值
            .addCase(asyncAddNum.fulfilled, (state, action) => {
                console.log('fulfilled action', action);
                state.num += action.payload
            })
            .addCase(asyncAddNum.rejected, (state, action) => {
                console.log('rejected action: ', action);
            })
    }
    

})

export const { addNum,decNum } = countSlice.actions
export const asyncAddNum = createAsyncThunk('count/asyncaddNum',async (payload)=>{
    // 发送异步请求，获取数据
    let { data } = await axios.get('https://api.github.com/search/users?q=aa')
    // 返回成功的 PromiseResult值
    return data.total_count;
})

export default countSlice.reducer