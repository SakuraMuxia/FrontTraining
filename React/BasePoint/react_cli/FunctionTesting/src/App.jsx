import React, { useState } from 'react'
import { useEffect } from 'react'
// 1. 导入PubSub
import PubSub from 'pubsub-js'

import Fan from './components/Fan'
import Kun from './components/Kun'

export default function App() {
    let [user,setUser] = useState({
        username: 'atguigu', 
        age: 10
    })
    function changeUserName(age){
        const newUser = {
            username: 'Hanser',
            age,
        }
        setUser(newUser)
    }
    useEffect(() => { // componentDidMount
        // 订阅Fan消息
        let fanId = PubSub.subscribe('fan', (msg, data) => {
            console.log('App data: ', data);
        })
        // 订阅Kun消息
        let kunId = PubSub.subscribe('kun', (msg, data) => {
            console.log('App data: ', data);
        })
        return () => { // componentWillUnmount
            PubSub.unsubscribe(fanId);// 取消订阅fan的消息
            PubSub.unsubscribe(kunId);
        }
    }, [])
    return (
        <div>
            <h3>App</h3>
            <p><button onClick={() => {
                PubSub.unsubscribe('fan');// 全网封杀fan消息
            }}>取消订阅_fan</button></p>
            <p><button onClick={() => {
                PubSub.clearAllSubscriptions();
            }}>封杀所有艺人</button></p>
            <hr />
            <Fan />
            <hr />
            <Kun />
        </div>
    )
}
