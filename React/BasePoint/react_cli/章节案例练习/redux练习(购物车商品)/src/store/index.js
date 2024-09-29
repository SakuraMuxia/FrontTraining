import { configureStore } from "@reduxjs/toolkit"
import goods from "./slice/goodsSlice"
import cart from "./slice/cartSlice";

// 创建仓库对象store
const store = configureStore({
    reducer: {
        goods,
        cart
    }
})
export default store;