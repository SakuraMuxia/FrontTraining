import React from 'react'
import { useLocation } from 'react-router-dom'

export default function StateTest() {
    let x = useLocation();
    console.log('x: ', x);// {pathname: '/home/message/state', search: '', hash: '', state: {…}, key: 'sywlhcu2'}
    // 从state中解构获取数据
    let { state: { id, title, isDone } } = useLocation();
    return (
        <div>
            <h3>StateTest</h3>
            <p>state id: {id}</p>
            <p>state title: {title}</p>
            <p>state isDone: {isDone ? '已完成' : '未完成'}</p>
        </div>
    )
}
