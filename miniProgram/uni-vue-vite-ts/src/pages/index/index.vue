<template>
	<view class="home">
		<!-- 顶部的轮播 -->
		<swiper class="swiper" indicator-dots autoplay circular>
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image class="img" :src="item.src" mode="scaleToFill" />
			</swiper-item>
		</swiper>
		<!-- 学习课程分类 -->
		<view class="study">
			<view class="item" v-for="(item, index) in categoryList" :key="index">
				<image class="img" :src="item.src" mode="scaleToFill" />
				<text class="title">{{ item.name }}</text>
			</view>
		</view>

		<!-- 热门课程组件 -->
		<!-- 传递 title和subtitle -->
		<v-card title="热门课程" subtitle="全部课程>">
			<!-- 使用 具名插槽 -->
			<template #content>
				<v-item :list="courseArr" type="course"></v-item>
			</template>
		</v-card>

		<!-- 展示老师的地方 -->
		<v-card title="名师大咖" subtitle="全部名师>">
			<template #content>
				<v-item :list="teacherArr" type="teacher"></v-item>
			</template>
    	</v-card>

		<!-- 回到顶部 -->
		 <!-- 底部指定的组件 -->
		 <v-top v-show="back"></v-top>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bannerCateList, hotCateList } from "@/mock/index";
//页面生命周期函数
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import ajax from "@/api/index.ts";


// 首页轮播图
const bannerList = ref(bannerCateList);
const categoryList = ref(hotCateList);
// 存储课程的数据
const courseArr = ref([]);
// 老师的数据
const teacherArr = ref([]);
// 回到顶部组件状态
const back = ref(false);

const getHomeData = async () => {
	//获取首页的数据
	const result = await ajax.reqEdu();
	if (result.code == 200) {
		courseArr.value = result.data.courseList;
		teacherArr.value = result.data.teacherList;
	}
};

onLoad(() => {
	//获取首页的数据(课程与老师的数据)
	getHomeData();
});
//监听页面的滚动
onPageScroll((event) => {
	if (event.scrollTop >= 200) {
		back.value = true;
	} else {
		back.value = false;
	}
})


</script>

<style scoped lang="less">
.home {
	width: 100%;
}

.home .swiper {
	width: 100%;
	height: 300rpx;
}

.home .swiper .img {
	width: 100%;
	height: 100%;
}

.home .study {
	display: flex;
	padding: 20rpx;
}

.home .study .item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.home .study .item .img {
	width: 72rpx;
	height: 72rpx;
}

.home .study .item .title {
	color: hotpink;
}
</style>
