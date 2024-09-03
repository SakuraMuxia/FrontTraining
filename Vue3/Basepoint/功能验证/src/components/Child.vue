<template>
    <div>Child</div>
    <p @click="setCount(50)">count:{{ count }}</p>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

let a = 1;
let count = ref(100);
let setCount = function (n: number) {
    count.value = n;
}
// 如果要在组件外部使用当前组件的数据状态，必须暴露。
defineExpose({ a, count, setCount })
</script>

<style scoped></style>