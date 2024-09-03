<template>
    <div class="todo-container">
        <div class="todo-wrap">
            <div class="todo-header">
                <input ref='inputBox' @keyup.enter="addTaskList" type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
            <ul class="todo-main">
                <li @mouseenter="activeId = item.id" @mouseleave="activeId = 0" v-for="(item) in taskList"
                    :key="item.id">
                    <label>
                        <input @change="setIsCheckedById(item.id)" :checked="item.isChecked" type="checkbox" />
                        <span>{{ item.title }}</span>
                    </label>
                    <button class="btn btn-danger" @click="delTaskListByIndex(item.id)"
                        v-show="item.id === activeId">删除</button>
                </li>
            </ul>
            <div class="todo-footer">
                <label>
                    <input @change="changeIsAll" :checked="isAll()" type="checkbox" />
                </label>
                <span>
                    <span>已完成{{ taskList.filter(item => item.isChecked).length }}</span> / 全部{{ taskList.length }}
                </span>
                <button class="btn btn-danger" @click="clearAllIsChecked"
                    v-show="taskList.filter(item => item.isChecked).length > 0">清除已完成任务</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref, reactive, onMounted, nextTick } from "vue"

// 定义一个类型
type TTaskInfo = {
    id: number,
    title: string,
    isChecked: boolean
}
// 创建一个TaskInfo类型的Proxy数组
let taskList = ref<TTaskInfo[]>([])

// 当前选中的ID
let activeId = ref(0)
const inputBox = ref()
// 全选方法
const changeIsAll = function () {
    // isAll当前是否全选，再取反
    let a = !isAll();
    // 方式1
    // taskList.value.forEach(item => item.isChecked = a)
    // 方式2
    taskList.value = taskList.value.map(item => {
        item.isChecked = a
        return item
    })
}

// 清除所有被选中的
const clearAllIsChecked = function () {
    // 方式1 [...taskList] 先复制一份数据
    taskList.value = taskList.value.filter(item => !item.isChecked)
    
}

// 根据ID修改选中的状态
const setIsCheckedById = function(id:number){
     const info = taskList.value.find(v=>v.id===id) as TTaskInfo;
     info.isChecked = !info.isChecked;
}

// 是否被全选
const isAll = function () {
    // 选中的数量
    let checkedNum = taskList.value.filter(item => item.isChecked).length;
    // 任务的总数量
    let allCheckedNum = taskList.value.length;
    let isAllChecked = checkedNum === allCheckedNum;
    // 排除任务为0时全选
    if (checkedNum === 0 && allCheckedNum === 0)
        isAllChecked = false;
    return isAllChecked;
}
// 通过index删除任务
const delTaskListByIndex = function (id: number) {
    if (window.confirm("您确定要删除该任务吗")) {
        taskList.value = taskList.value.filter(item => item.id !== id)
    }
}
// 添加任务
const addTaskList = function (e: any) {
    const title = e.target.value.trim();
    if (title.length === 0) {
        alert("请输入任务标题！");
        return;
    }
    if (taskList.value.some(v => v.title === title)) {
        alert("任务标题不允许重复");
        return;
    }
    taskList.value = [
            ...taskList.value,
            {
                id:Date.now(),
                isChecked:true,
                title
            }
        ]
    }
    nextTick(function(){
        (document.querySelector('input') as HTMLInputElement).value = ''
    })

</script>

<style scoped>
body {
    background: #fff;
}

.btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
}

.btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
}

.btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
}

.btn:focus {
    outline: none;
}

/*app*/
.todo-container {
    width: 600px;
    margin: 0 auto;
}

.todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

/*header*/
.todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
}

.todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

/*main*/
.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
}

.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}

/*item*/
li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li label {
    float: left;
    cursor: pointer;
}

li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li button {
    float: right;
    display: none;
    margin-top: 3px;
}

li:before {
    content: initial;
}

li:last-child {
    border-bottom: none;
}

/*footer*/
.todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}
</style>
