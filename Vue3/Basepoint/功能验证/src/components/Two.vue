<template>
    <!--方式1-->
    <h3 @click="changeNum">{{ num }}</h3>
    <!--方式2-->
    <h3 @click="bus.emit('changenum', 300)">{{ num }}</h3>
</template>

<script setup lang="ts">
import { bus } from "@/utils/mitt.js";
import {defineProps} from 'vue'
defineProps(["num"]);
// 定义一个函数，触发监听事件
const changeNum = function () {
    bus.emit("changenum", 200);
}
</script>

<style scoped></style>