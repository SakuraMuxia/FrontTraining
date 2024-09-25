import React from 'react'
import './index.css'
import PubSub from 'pubsub-js'
export default function Item({ todo }){

    function changeCheckOne(id){
        // 通过PubSub 调用checkOne方法
        PubSub.publish('checkOneMsg', id)
    }
    
    function delTodo(id) {
        // 通过PubSub 调用delTodo方法
        PubSub.publish('delTodoMsg', id)
    }
    
    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone} onChange={() => changeCheckOne(todo.id)}/>
                <span>{todo.mission}</span>
            </label>
            <button className="btn btn-danger" onClick={()=>{delTodo(todo.id)}}>删除</button>
        </li>
    )
}