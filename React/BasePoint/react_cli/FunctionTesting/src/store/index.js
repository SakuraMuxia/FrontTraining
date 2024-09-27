import { configureStore } from "@reduxjs/toolkit"
import count from "./slice/conutSlice"
import user from "./slice/userSlice"

// 创建仓库对象store
const store = configureStore({
    reducer: {
        count,
        user
    }
})
export default store;