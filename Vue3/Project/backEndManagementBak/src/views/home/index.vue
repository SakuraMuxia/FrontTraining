<template>
	<div class="home">
		<Top  :data="chartObj"/>
		<Middle  :data="chartObj"/>
		<Bottom />
	</div>
</template>

<script lang="ts">
export default {
	name: 'Home',
}
</script>
<script lang="ts" setup>
import { useUserInfoStore } from '@/stores/userInfo'
import Middle from '@/views/home/midChart/index.vue'
import Top from '@/views/home/topChart/index.vue'
import Bottom from '@/views/home/bottomChart/index.vue'
//引入请求函数
import { reqCharts } from "@/api/home"
import { ref, onMounted } from "vue"
// 存储首页数据可视化的数据对象
const chartObj = ref({})
const userInfoStore = useUserInfoStore()
//组件挂载完毕:获取首页需要数据
onMounted(() => {
  	getData()
})
//获取首页全部的数据方法
const getData = async() => {
    const result = await reqCharts()
    //存储数据
    chartObj.value = result
}

</script>



<style scoped>

</style>
