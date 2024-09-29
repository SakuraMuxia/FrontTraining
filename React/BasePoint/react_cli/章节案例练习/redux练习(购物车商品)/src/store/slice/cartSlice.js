import { createSlice } from "@reduxjs/toolkit"; 

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartList:[]
    },
    reducers:{

        // 增加到购物车
        addCart(state,{payload}){
            /**
             * 如果carList里面已经有了该商品[id], 只增加buyNum数量，
             * 没有该商品，新增
             */

            // 找到第一个数组重复的索引
            let index = state.cartList.findIndex(car => car.id === payload.id)
            // 当前商品在carList数组中不存在 ==> 新增并设置 购买数量属性
            if (index === -1) {
                state.cartList = [...state.cartList, { ...payload, buyNum: 1 }]
            // 存在 ==> buyNum + 1
            } else {
                state.cartList[index].buyNum += 1;
            }
        },
        // 增加购买数量
        addBuyNum(state,{payload}){
            // console.log('addBuyNum payload: ', payload)
            // 找到这个id对应的购物车商品
            let index = state.cartList.findIndex(car => car.id === payload)
            state.cartList[index].buyNum += 1
            
            console.log(state.cartList[index]) // 这里返回的是一个Proxy类型的对象 和Vue3 reactive()函数相似
            
        },
        // 减少购买数量
        decBuyNum(state, { payload }) {
            // console.log('decBuyNum payload: ', payload)
            let index = state.cartList.findIndex(car => car.id === payload)
            let num = state.cartList[index].buyNum - 1
            // 对数量进行限制
            if (num <= 0) {
                // 将该商品在购物车删除  splice(index)
                state.cartList.splice(index, 1)
            } else {
                state.cartList[index].buyNum = num;
            }
        }
    }
})
export default cartSlice.reducer
export const { addCart, addBuyNum, decBuyNum } = cartSlice.actions;
