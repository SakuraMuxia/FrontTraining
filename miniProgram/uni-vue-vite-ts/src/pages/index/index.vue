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
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bannerCateList, hotCateList } from "@/mock/index";
//首页轮播图
const bannerList = ref(bannerCateList);
const categoryList = ref(hotCateList);
//存储课程的数据
const courseArr = ref([]);
//老师的数据
const teacherArr = ref([]);




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
