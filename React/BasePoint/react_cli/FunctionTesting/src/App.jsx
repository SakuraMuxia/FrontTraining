import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNum } from './store/slice/conutSlice'
export default function App() {
    let {num} = useSelector(state => state.count)
    const dispatch = useDispatch()
    return (
        <div>
            <p>count num: {num}</p>
            <p><button onClick={() => {
                dispatch(addNum(3))
            }}>count + 3</button></p>
        </div>
    )
}

