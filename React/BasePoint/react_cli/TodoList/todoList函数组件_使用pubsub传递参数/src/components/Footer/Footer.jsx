import React, { Component } from 'react'
import './index.css'
import PubSub from 'pubsub-js';
export default function Footer({todos}){
    let total = todos.length;
    let doneNum = todos.reduce((pre,item)=>{return pre + item.isDone},0)

    function checkAll(check){
        PubSub.publish('checkAllMsg', check)
    }
    function delDoneMission(){
        PubSub.publish('delDoneMissionMsg')
    }
    return (
        <div className="todo-footer">
            <label>
                <input type="checkbox" checked={doneNum === total && total > 0} onChange={(e)=>checkAll(e.target.checked)} />
            </label>
            <span>
                <span>已完成{doneNum}</span> / 全部{total}
            </span>
            <button className="btn btn-danger" onClick={delDoneMission}>清除已完成任务</button>
        </div>
    )
}