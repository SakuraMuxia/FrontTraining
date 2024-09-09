<template>
    <h4>Child2</h4>
    <h4>{{ modelValue }}</h4>
    <!-- 通过调用传递过来的属性的对应函数改变数值 -->
    <button @click="test">onUpdate:modelValue</button>
    <!-- 通过触发自定义事件改变数值 -->
    <button @click="test2">update:model-value</button>
</template>

<script lang="ts" setup>
const props = defineProps(["modelValue", "onUpdate:modelValue"]);
const emit = defineEmits(["update:model-value"]);
const test = function () {
    // 调用onUpdate:modelValue函数
    props["onUpdate:modelValue"]("lisi");
}
const test2 = function () {
    emit("update:model-value", "wangwu")
}
</script>

<style scoped></style>