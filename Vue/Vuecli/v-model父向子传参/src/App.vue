<template>
    <div>
        <h3>v-model数据的双向绑定</h3>
        <!-- vue2父元素数据双向绑定 -->
        <input type="text" v-model="num" />{{ num }}
        <!-- 上面一条v-model语句相当于传递value属性，并且监听一个input事件 -->
        <input type="text" :value="num" @input="num = $event.target.value" />
        <input type="text" :value="num" @input="handle($event.target.value)" />
        <!-- vue2中实现父子组件数据同步 -->
        <Child v-model="num" />
        <!-- v-model的作用相当于传递value属性，并且设置一个自定义事件，如下 -->
        <!-- 通过传递value属性，同时设置自定义事件input==向子组件传递了一个事件 input -->
        <!-- 当事件触发时，会执行事件后面的处理函数handle：将接收的值作为当前状态的num值 -->
        <!-- handle函数是伪代码，v-model内部是由vue自己实现的 -->
        <Child :value="num" @input="handle" />

    </div>
</template>

<script>
import Child from "./components/Child.vue";
export default {
    name: "App",
    components: { Child },
    data() {
        return {
            num: 1
        }
    },
    methods: {
        handle(v) {
            this.num = v
        }
    },
}
</script>

<style lang="less">

</style>
