<template>
    <h3>Child</h3>
    <p>钱包余额{{ money }}</p>
    <button @click="income($parent)">转入</button>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const money = ref(2000);
const income = function (parent: any) {
    money.value -= 100;
    // 父亲增加100
    parent.account += 100;
}
defineExpose({ money })
</script>
<style scoped></style>