import React from 'react'
import './index.css'
export default function Item({ todo, delTodo,checkOne }){

    return (
        <li>
            <label>
                <input type="checkbox" checked={todo.isDone} onChange={()=>checkOne(todo.id)}/>
                <span>{todo.mission}</span>
            </label>
            <button className="btn btn-danger" onClick={()=>{delTodo(todo.id)}}>删除</button>
        </li>
    )
}