import React, { Component } from 'react'
import Item from '../Item/Item'
import './index.css'
export default class Main extends Component {
    render() {
        let { todos, deleteById, checkOne } = this.props
        return (
            <ul className="todo-main">
                {todos.map(todo => (<Item key={todo.id} todo={todo} deleteById={deleteById} checkOne={checkOne} />))}
            </ul>
        )
    }
}