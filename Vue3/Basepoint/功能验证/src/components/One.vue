<template>
    <h3>{{ num }}</h3>
</template>

<script setup lang="ts">

import { onMounted } from "vue";
import { bus } from "@/utils/mitt.js";
import { defineProps } from 'vue'
defineProps(["num"]);
onMounted(function () {
    // 监听一个事件 changenum
    bus.on("changenum", () => {
        console.log("ONE->changenum");
        // bus.off("changenum");
    })
})
</script>