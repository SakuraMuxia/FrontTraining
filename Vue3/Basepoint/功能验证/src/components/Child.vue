<template>
    <h3>Child</h3>
    <!-- 向父组件传递 userName和age属性 -->
    <!--父组件template标签内的数据默认在slot标签位置渲染-->
    <!-- 出口 -->
    <slot :userName="userName" :age="age"></slot>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 获取父组件的属性 info
const props = defineProps(["food"]);
// 定义一个ref实例
const userName = ref("hanser")
const age = ref(18)

// 暴漏数据
defineExpose({ userName, age })
</script>