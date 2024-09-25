import React, { useState } from 'react'
import PubSub from 'pubsub-js'
import { useContext } from 'react'

export default function Grandson() {
    // 解构content实例
    let { user, changeUserName } = useContext(context)
    // 定义状态
    let [age,setAge] = useState(20)
    return (
        <div>
            <h4>Grandson</h4>
            <p>Grandson username: {user.username}</p>
            <p>Grandson age: {user.age}</p>
            <p><button onClick={()=>changeUserName(45)}>更改年龄</button></p>
        </div>
    )
}
