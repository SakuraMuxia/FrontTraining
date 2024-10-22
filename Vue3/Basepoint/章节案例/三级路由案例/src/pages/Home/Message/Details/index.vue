<template>
    <h4>Detail</h4>
    <h5>{{state.film.name}}</h5>
    <h5>{{ state.film.category }}</h5>
</template>

<script lang="js" setup>
import { onBeforeRouteUpdate, useRoute,useRouter } from "vue-router";
import { onMounted, reactive, watch } from "vue";
import { getMessageDetails } from '@/api/index.js'
// 方案一 导入router对象
import $router from "@/router"
console.log($router.currentRoute.value.params.filmId)
// 方案二 通过Route对象
const route = useRoute()
console.log(route.params.filmId)
// 方案三 通过Router对象
const router = useRouter()
console.log(router.currentRoute.value.params.filmId)

const state = reactive({
    film: {}
})

const getFilms1 = function (filmId){
    getMessageDetails(filmId).then(res => {
        state.film = res.data.film
    })
}
// 获取数据方案一
// 在路由更新前调用方法获取数据
onBeforeRouteUpdate(async function(to,from,next){
    await getFilms1(to.params.filmId )
    next();
})
// 在挂载路由后获取数据
onMounted(function (){
    getFilms1(route.params.filmId)
})

// 获取数据方案二- watch
watch(() => route.params.filmId, () => { 
        getFilms1(route.params.filmId) 
    },{
        immediate:true
    })
</script>

<style scoped></style>