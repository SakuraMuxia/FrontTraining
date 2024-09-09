<template>
    <h4 style="color: red;">Child</h4>
    <h4 style="color: red;" @click="$m('input', 'Yousa❤Hanser')">{{ value }}</h4>
</template>

<script lang="ts" setup>

defineProps(["value"])
// 声明触发的事件
const $m = defineEmits(["input"])
</script>

<style scoped></style>