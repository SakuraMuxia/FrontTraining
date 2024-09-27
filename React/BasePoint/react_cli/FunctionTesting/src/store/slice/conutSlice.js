import { createSlice } from '@reduxjs/toolkit'
const countSlice = createSlice({
    name:'count',
    initialState:{
        num:18,
        msg:'Just give me that chance---肖申克的救赎'
    },
    reducers:{
        addNum(state,action){
            state.num += action.payload
        },
        changeMsg(state,action){
            state.msg += action.payload
        }
    }
})
// 暴漏 actionCreator
export const {addNum,changeMsg} = countSlice.actions
// 暴漏 reducer
export default countSlice.reducer