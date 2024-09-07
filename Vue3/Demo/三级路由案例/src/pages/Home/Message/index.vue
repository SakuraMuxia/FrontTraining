<template>
    <h4>Message组件内容</h4>
    <div>
        <ul>
            <li v-for="item in state.films" :key="item.filmId">
                <router-link :to="{
                    path: '/home/message/' + item.filmId
                }">{{item.name}}</router-link> &nbsp;&nbsp;
                <button @click="goDetail(item.filmId)">push</button> &nbsp;
                <button @click="$router.replace('/home/message/'+item.filmId)">replace</button>
            </li>
        </ul>
        <button @click="$router.forward()">前进</button>
        <button @click="$router.back()">后退</button>
        <router-view></router-view>
    </div>
</template>

<script lang="js" setup>
import { onMounted,reactive } from 'vue'
import {getMessage} from '@/api/index'
import {useRouter} from 'vue-router'
let state = reactive({
    films: []
})
const $router = useRouter();

const goDetail = (filmId)=>{
    $router.push('/home/message/'+filmId)
}

onMounted(function(){
    getMessage().then(res => {
        state.films = res.data.films
    })
})


</script>

<style scoped></style>