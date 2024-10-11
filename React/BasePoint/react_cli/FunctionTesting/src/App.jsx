import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNum, decNum,asyncAddNum } from './store/slice/countSlice'
export default function App() {
    // 获取数据
    let { num } = useSelector(state => state.count)
    const dispatch = useDispatch()
    return (
        <div>

            <p>num: {num}</p>

            {/* 调用同步的reducer */}
            <p><button onClick={() => {
                dispatch(addNum(3))
            }}>num ++</button></p>

            <p><button onClick={() => {
                dispatch(decNum(5))
            }}>num--</button></p>

            <hr />

            {/* 调用异步的reducer */}
            <p><button onClick={() => {
                dispatch(asyncAddNum(10))
            }}>异步的 addNum</button></p>


        </div>
    )
}

