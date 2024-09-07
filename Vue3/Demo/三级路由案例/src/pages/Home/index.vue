<template>
    <h2>Home组件内容</h2>
    <div>
        <ul class="nav nav-tabs">
            <li><router-link to="/home/newsList" exact-active-class="active" class="list-group-item">NewsList</router-link></li>
            <li><router-link to="/home/message" active-class="active" class="list-group-item">Message</router-link></li>
        </ul>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style scoped></style>