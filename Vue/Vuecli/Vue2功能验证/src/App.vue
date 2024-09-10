<template>
    <h3>App</h3>
    <p>银行账户{{ account }}</p>
    <button @click="expenses">支出</button>
    <hr />
    <Child ref="wallet" />
</template>

<script lang="ts" setup>
// 在vue3中没有$children 但是在模块中有$parent
import Child from "@/components/Child.vue";
import { ref } from "vue"
const account = ref(10000000)
const wallet = ref()
const expenses = function () {
    account.value -= 1000
    wallet.value += 1000

}
defineExpose({ account })
</script>

<style scoped></style>
