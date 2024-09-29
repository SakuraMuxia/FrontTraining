import React, { Component } from 'react'
import './index.css'
export default class Header extends Component {
    // 添加方法
    sendTitle(e){
        // 判断是否是回车键
        if(e.key !== 'Enter') return;
        const title = e.target.value.trim();
        this.props.addTodo(title)
        // 清空文本框
        e.target.value = ''
    }
    render() {
        return (
            <div className="todo-header">
                <input type="text" onKeyUp={(event) => this.sendTitle(event)} placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}