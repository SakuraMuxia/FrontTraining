<template>
    <h4>Detail</h4>
    <h5>{{state.film.name}}</h5>
    <h5>{{ state.film.category }}</h5>
</template>

<script lang="js" setup>
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { onMounted, reactive, watch } from "vue";
import { getMessageDetails } from '@/api/index.js'
// 方案一 导入router对象
import $router from "@/router"

const state = reactive({
    film: {}
})

// 方案一 获取数据
const getFilms1 = function (filmId){
    getMessageDetails(filmId).then(res => {
        console.log(res.data.film)
        state.film = res.data.film
    })
}
// 在路由更新前调用方法获取数据
onBeforeRouteUpdate(async function(to,from,next){
    await getFilms1(to.params.filmId )
    next();
})
</script>

<style scoped></style>