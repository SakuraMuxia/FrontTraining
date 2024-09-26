import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function QueryTest() {
    let res = useSearchParams();
    console.log('res: ', res) // res是一个数组：[URLSearchParams, ƒ] 如同useState的返回值
    // 但不同的是 URLSearchParams 是一个对象，URLSearchParams对象的原型上URLSearchParams.Prototype存在get方法
    // 调用get方法可以获取到数据
    let [searchQuery, setSearchQuery] = useSearchParams();

    let username = searchQuery.get('username');
    let age = searchQuery.get('age');
    return (
        <div>
            <h3>QueryTest</h3>
            <p>query username: {username}</p>
            <p>query age: {age}</p>
            <p><button onClick={() => {
                setSearchQuery('?username=尚硅谷&age=100')
            }}>设置query参数</button></p>
        </div>
    )
}
