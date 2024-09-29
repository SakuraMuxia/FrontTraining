import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
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
        setTodos([todo,...todos])
    }
    // 删除todo
    function delTodo(id){
        if (!window.confirm('确定要删除么?')) return;
        // 使用filter方法返回一个新数组,把剩下来的 赋值给Todos
        setTodos(todos.filter(todo=>id !== todo.id))
    }

    // 修改checked状态
    function checkOne(id){
        setTodos(todos.map(todo=>{
            if (todo.id === id){
                todo.isDone = !todo.isDone
            }
            return todo
        } ))
    }

    // 全选状态
    function checkAll(isDone){
        setTodos(todos.map(todo=>{
            todo.isDone = isDone
            return todo
        }))
    }

    // 清除已完成
    // 将isDone是true删掉 == > 将isDone是false的保留
    function delDoneMission(){
        if (!window.confirm('确定要删除完成的项目么?')) return
        setTodos(todos.filter(todo=>!todo.isDone))
    }

    // 组件挂载完成后执行
    useEffect(()=>{
        // componentDisMount,挂载完成后从localStorage中获取数据
        let todosJson = localStorage.getItem('todos')
        let todos = JSON.parse(todosJson) || []
        // 设置todos
        setTodos(todos)
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
                    <Header addTodo={addTodo}/>
                    <Main todos={todos} delTodo={delTodo} checkOne={checkOne} />
                    <Footer todos={todos} delDoneMission={delDoneMission} checkAll={checkAll}/>
                </div>
            </div>
        </>
    )
}