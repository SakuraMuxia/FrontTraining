import React, { Component } from 'react'
import TodoList from './components/TodoList/TodoList'

export default class App extends Component{
    render(){
        return(
            <div>
                <TodoList></TodoList>
            </div>
        )
    }
}

