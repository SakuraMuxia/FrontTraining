<template>
    <div>
        <h4>I am Child</h4>
        <p>{{ num }}</p>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onBeforeUpdate, onUnmounted, watchEffect,ref } from "vue"
let userName = "Hanser"
const num = ref(1);
// 方式2：通过watchEffect函数的回调函数onInvalidate来执行清除定时器（在组件被销毁前）
// 新建一个侦听器
watchEffect(function (onInvalidate) {
    console.log("watchEffect回调函数");
    // 新建一个多次定时器
    const timer = setInterval(function () {
        console.log("定时器");
        num.value++;
    }, 1000)
    onInvalidate(function () {
        console.log("onInvalidate");
        clearInterval(timer);
    })
})
</script>

<style scoped></style>