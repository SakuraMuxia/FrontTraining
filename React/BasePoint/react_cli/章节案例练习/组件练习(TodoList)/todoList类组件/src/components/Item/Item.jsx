import React, { Component } from 'react'
import './index.css'
export default class Item extends Component {
    render() {
        let { todo, deleteById, checkOne } = this.props
        return (
            <li>
                <label>
                    <input type="checkbox" checked={todo.isDone} onChange={() => checkOne(todo.id)}/>
                    <span>{todo.title}</span>
                </label>
                <button className="btn btn-danger" onClick={()=>deleteById(todo.id)}>删除</button>
            </li>
        )
    }
}