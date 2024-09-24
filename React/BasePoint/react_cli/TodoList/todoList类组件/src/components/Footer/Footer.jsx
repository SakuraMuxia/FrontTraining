import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
    // changeToAll
    changeToAll(e) {
        const isChecked = e.target.checked
        this.props.checkAll(isChecked)
    }

    render(){
        // 接收todos
        let { todos, deleteDone } = this.props
        // 总条数
        let total = todos.length;
        // 已完成数量
        let doneNum = todos.reduce((pre,item)=>{
            // 使用强制类型转换
            return pre + item.isDone
        },0)
        return(
            <div className="todo-footer">
                <label>
                    <input type="checkbox" checked={doneNum === total && total > 0} onChange={this.changeToAll.bind(this)}/>
                </label>
                <span>
                    <span>已完成 {doneNum}</span> / 全部 {total}
                </span>
                <button className="btn btn-danger" onClick={deleteDone}>清除已完成任务</button>
            </div>
        )
    }
}