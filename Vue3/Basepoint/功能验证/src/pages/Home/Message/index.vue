<template>
    <h4>Message组件内容</h4>
    <div>
        <ul>
            <li v-for="item in state.films" :key="item.filmId">
                <router-link :to="{
                    path: '/home/message/' + item.filmId
                }">{{item.name}}</router-link> &nbsp;&nbsp;
                <button>push</button> &nbsp;
                <button>replace</button>
            </li>
        </ul>
        <button>前进</button>
        <button>后退</button>
        <router-view></router-view>
    </div>
</template>

<script lang="js" setup>
import { onMounted,reactive } from 'vue'
import {getMessage} from '@/api/index'

let state = reactive({
    films: []
})

onMounted(function(){
    getMessage().then(res => {
        state.films = res.data.films
    })
})


</script>

<style scoped></style>