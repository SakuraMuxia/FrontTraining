import React from 'react'
import Grandson from './Grandson'
import context from '../content/content'
import { useContext } from 'react'
export default function Child() {
    // 解构content实例
    let { user } = useContext(context)
    // 渲染数据
    return (
        <div>
            <h4>Child</h4>
            <p>Child username: {user.username}</p>
            <p>Child age: {user.age}</p>
            <hr />
            <Grandson />
        </div>


    )
}