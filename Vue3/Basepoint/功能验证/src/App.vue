<template>
    <h3>App</h3>
    <Child>
        <!--把template包裹的标签放置在子组件对应的slot标签中渲染 -->
        <!-- 入口 -->
        <!--slotProps用于接收子组件传来的属性-->
        <template v-slot="slotProps">
            <p>{{ slotProps.userName }}</p>
            <p>{{ slotProps.age }}</p>
        </template>
    </Child>
</template>

<script lang="ts" setup>
import Child from "@/components/Child.vue";
import {ref} from 'vue'
const slotProps = ref()
console.log(slotProps)
</script>