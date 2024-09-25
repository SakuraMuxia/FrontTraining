import React from 'react'
import PubSub from 'pubsub-js';
import './index.css'
export default function Header (){
    function addMission(e){
        // 1. 判断是否按的是回车
        // 2. 获取用户输入内容
        // 3. 调用方法，传递数据给父组件
        if(e.key !== 'Enter') return;
        let mission = e.target.value.trim()
        // 发布消息
        PubSub.publish('addTodoMsg', mission)
        // 清空文本框
        e.target.value = ''
    }
    return (
        <div className="todo-header">
            <input type="text" onKeyUp={addMission} placeholder="请输入你的任务名称，按回车键确认" />
        </div>
    )
}