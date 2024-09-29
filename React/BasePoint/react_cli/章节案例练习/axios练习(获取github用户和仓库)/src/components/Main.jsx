import React from 'react'
import PubSub from 'pubsub-js'
import { getUsers } from '../api/github'
import { useEffect,useState } from 'react'
import Item from './Item'
export default function Main() {
    // 定义状态
    let [users, setUsers] = useState([]) // 防止undefined
    let [loading, setLoading] = useState(false);
    let [first, setFirst] = useState(true);// 是否是第一次进入该页面
    useEffect(()=>{
        // 订阅消息
        PubSub.subscribe('search',async (msg,data)=>{
            // 判断first是否第一次
            first && setFirst(false)
            // 设置加载状态
            setLoading(true)
            // 发送请求,接收数据
            console.log(data)
            let {items} = await getUsers(data)
            console.log(items)
            // 设置数据状态
            setUsers(items)
            setLoading(false);
        })
    },[])


    // 首次提示渲染
    if (first) {
        return <h4>请输入用户名搜索</h4>
    }
    // 加载中渲染
    if (loading) {
        return <h1>Loading.....</h1>
    }

    return (
        <div className="row">
            {users.map(user=>(
                <Item user={user} key={user.id}/>
            ))}
        </div>
        
    )
}
