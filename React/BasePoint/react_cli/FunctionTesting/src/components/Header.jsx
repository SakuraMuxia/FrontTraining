import React from 'react'
import PubSub from 'pubsub-js'
import { useRef } from 'react'

export default function Header() {
    const inputRef = useRef();

    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input ref={inputRef} type="text" placeholder="请输入用户名" />
                <button onClick={() => {
                    // 1. 获取input文本框的输入
                    // 2. 将username数据 传递给兄弟组件 Main
                    let username = inputRef.current.value.trim()
                    // 发布消息
                    PubSub.publish('search', username);
                }}>Search</button>
            </div>
        </section>
    )
}
