import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import PubSub from 'pubsub-js'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import Main from '../Main/Main'
import './index.css'

export default function TodoList(){
    // 定义标记Ref,设置初始值为true
    const flagRef = useRef(true)
    // 状态数据定义
    let [todos,setTodos] = useState([])
    // 添加todo
    function addTodo(mission){
        // 创建一个对象
        let todo = {
            id: nanoid(),
            mission,
            isDone: false
        }
        // 把这对象添加到数组中:使用setTodos,把新值赋值给旧值替换
        // 使用第二种写法：把缓存空间中的todos存放，原因由于产生了闭包
        setTodos(todos=>{
            return [todo,...todos]
        })
    }
    // 删除todo
    function delTodo(id){
        if (!window.confirm('确定要删除么?')) return;
        // 使用filter方法返回一个新数组,把剩下来的 赋值给Todos
        setTodos(todos => todos.filter(todo=>id !== todo.id))
    }

    // 修改checked状态
    function checkOne(id){
        setTodos(todos => todos.map(todo=>{
            if (todo.id === id){
                todo.isDone = !todo.isDone
            }
            return todo
        } ))
    }

    // 全选状态
    function checkAll(isDone){
        setTodos(todos => todos.map(todo=>{
            todo.isDone = isDone
            return todo
        }))
    }

    // 清除已完成
    // 将isDone是true删掉 == > 将isDone是false的保留
    function delDoneMission(){
        if (!window.confirm('确定要删除完成的项目么?')) return
        setTodos(todos => todos.filter(todo=>!todo.isDone))
    }

    // 组件挂载完成后执行
    useEffect(()=>{
        // componentDisMount,挂载完成后从localStorage中获取数据
        let todosJson = localStorage.getItem('todos')
        let todos = JSON.parse(todosJson) || []
        // 设置todos
        setTodos(todos)

        // 使用pubsub订阅消息,用于接收数据
        let addTodoId = PubSub.subscribe('addTodoMsg',(msg,data)=>{
            addTodo(data)
        })
        let delTodoId = PubSub.subscribe('delTodoMsg', (msg, data) => {
            delTodo(data)
        })
        let checkOneId = PubSub.subscribe('checkOneMsg', (msg, data) => {
            checkOne(data)
        })
        let checkAllId = PubSub.subscribe('checkAllMsg', (msg, data) => {
            checkAll(data)
        })
        let delDoneMissionId = PubSub.subscribe('delDoneMissionMsg', () => {
            delDoneMission()
        })
        return () => {  // 组件卸载前执行
            PubSub.unsubscribe(addTodoId)
            PubSub.unsubscribe(delTodoId)
            PubSub.unsubscribe(checkOneId)
            PubSub.unsubscribe(checkAllId)
            PubSub.unsubscribe(delDoneMissionId)
        }
    },[])
    // 组件更新完成后执行
    useEffect(()=>{
        if (flagRef.current){
            flagRef.current = false
            return
        }
        // 更新本地存储数据
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    return(
        <>
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header />
                    <Main todos={todos} />
                    <Footer todos={todos}/>
                </div>
            </div>
        </>
    )
}