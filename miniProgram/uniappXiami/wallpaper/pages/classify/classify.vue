<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :item="item" :key="item._id"></theme-item>
		</view>
	</view>
</template>

<script setup>
// 大分类页面，tabBar中的分类页面
import { ref } from 'vue';
import { apiGetClassify } from "@/api/home/home.js"
import { onReady } from '@dcloudio/uni-app';
const classifyList = ref([]);

// 获取分类
const getClassify = async () => {
	const data = {
		pageSize:15
	};
	await apiGetClassify(data)
		.then((res) => {
			classifyList.value = res.data
		})
		.catch((err) => {
			console.log(err);
		});
};

onReady(()=>{
	// 获取分类请求
	getClassify()
})
</script>

<style lang="scss" scoped>
.classify{
	padding:30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap:15rpx;
}
</style>
