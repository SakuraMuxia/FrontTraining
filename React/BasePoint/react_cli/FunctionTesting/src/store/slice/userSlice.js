import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: 'atguigu',
        age: 10
    },
    reducers: {
        addAge(state, { payload }) {
            state.age += payload
        }
    }
})
// actionCreator  addAge
export const { addAge } = userSlice.actions;
export default userSlice.reducer;