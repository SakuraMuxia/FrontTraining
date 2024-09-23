// 1. 从react中解构 useEffect
import React, { useEffect, useRef, useState } from 'react'

export default function App() {

    let [count, setCount] = useState(88)
    const flagRef = useRef(true)
    console.log(flagRef) //当初次调用代码时，执行到这 {current:true}
    
    useEffect(()=>{
        console.log("App is mouted")
        if (flagRef.current) {
            flagRef.current = false; // 初次挂载完成后 {current:false}
            return; // 初次挂载完成后,直接跳出函数
        }
        console.log("App is update")
    })
    return (
        <div>
            <p>{count}</p>
            <p><button onClick={() => {
                setCount(count + 1)
            }}>count++</button></p>
        </div>
    )
}