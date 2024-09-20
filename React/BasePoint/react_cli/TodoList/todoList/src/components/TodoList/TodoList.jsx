import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './index.css'

export default class TodoList extends Component {
    state={
        // 初始数据为一个空数组
        todos:[]
    }
    // 组件挂载完成后
    componentDidMount(){
        // 从本地存储读取数据
        const stringTodos = localStorage.getItem('todos')
        // json字符串转为对象
        const objToDos = JSON.parse(stringTodos) || []
        // 设置数据状态
        this.setState({
            todos: objToDos
        })
    }
    // 当组件更新时
    componentDidUpdate(){
        // 把todos对象转为json字符串
        const stringTodos = JSON.stringify(this.state.todos)
        // 存储数据到localstorage
        localStorage.setItem('todos', stringTodos)
    }
    addTodo(title){
        // 拼接一个新的todo
        let todo = {
            id:nanoid(),
            title,
            isDone:false
        }
        // 将todo加入到todos状态中
        this.setState({
            todos:[todo,...this.state.todos]
        })
    }
    deleteById(id) {
        if (!window.confirm('确定删除么?')) return;
        console.log('father id: ', id);
        // 
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }
    checkOne(id){
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.isDone = !todo.isDone;
                }
                return todo;
            })
        })
    }
    checkAll(isDone){
        this.setState({
            todos:this.state.todos.map(todo=>{
                todo.isDone = isDone
                return todo
            })
        })
    }
    deleteDone(){
        if (!window.confirm('确定删除已完成么?')) return;
        this.setState({
            todos: this.state.todos.filter(todo => !todo.isDone)
        })
    }
    render() {
        let { todos } = this.state
        return (
            <>
                <div className="todo-container">
                    <div className="todo-wrap">
                        <Header addTodo={this.addTodo.bind(this)}/>
                        <Main todos={todos} deleteById={this.deleteById.bind(this)} checkOne={(id)=>this.checkOne(id)} />
                        <Footer todos={todos} checkAll={this.checkAll.bind(this)} deleteDone={this.deleteDone.bind(this)} />
                    </div>
                </div>
            </>
        )
    }
}