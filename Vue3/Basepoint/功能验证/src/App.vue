<template>
    <h3>v-model数据的双向绑定</h3>

    <input type="text" v-model="num" />
    {{num}}
    <!-- vue2中实现父子组件数据同步 -->
    <!-- 通过传递value属性，同时设置自定义事件input -->
    <input type="text" :value="userName" @input="num=$event.target.value" />

    <!-- v-model 实现父子组件数据同步 -->
    <!-- 1- 向子组件传递了两个属性：modelValue  onUpdate:modelValue 这些在F12的工具中可以看到-->
    <!-- 2- 向子组件传递了自定义事件：update:model-value 具有Vue2中的sync的作用-->
    <Child2 v-model="userName" />
    <!-- 相当于写了如下的代码 这里的setUserName是伪代码 -->
    <Child2 :modelValue="userName" :onUpdate:modelValue="setUserName" @update:model-value="setUserName" />

</template>

<script>
import Child from "@/components/Child.vue"
export default{
    name:"App",
    components:{Child},
    data(){
        return{
            num:1
        }
    }
}


</script>

<style scoped></style>