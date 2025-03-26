<template>
	<view class="classlist">
		<!-- 顶部加载样式 无数据时，并且后续有数据 显示-->
		<view class="loadingLayout" v-if="!classList.length && !noData">
			<uni-load-more status="loading"></uni-load-more>
		</view>
		<!-- 使用骨架屏 -->
		<!-- <uv-skeleton :loading="true" :animate="true" rows="3" :title="false" :rowsHeight="200" rowsWidth="33%" >
			
		</uv-skeleton> -->
		<!-- 内容 -->
		<view class="content">
			<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList" :key="item._id">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 顶部加载样式 有数据，或者后续无数据 显示-->
		<view class="loadingLayout" v-if="classList.length || noData">
			<uni-load-more :status="noData ? 'noMore' : 'loading'"></uni-load-more>
		</view>
		<!-- 底部安全区域 -->
		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
// 分类详情页面(分类列表)
import { ref } from 'vue';
import { onLoad, onReady, onReachBottom, onPullDownRefresh,onUnload } from '@dcloudio/uni-app';
import { apiGetClassList, apiGetHistoryList } from '@/api/class/class.js';
import {gotoHome} from "@/utils/common.js"
const classList = ref([]);
const loading = ref(false);
const queryParams = ref({
	classid: null,
	name: null,
	type: null,
	pageNum: 1,
	pageSize: 12
});
const noData = ref(false);

// 分类数据请求
const getClassList = async () => {
	loading.value = true
	let res;
	// 判断是 分类 来的 还是 历史记录来的
	if (queryParams.value.classid) {
		res = await apiGetClassList(queryParams.value);
	}
	// 历史记录
	if (queryParams.value.type) {
		res = await apiGetHistoryList(queryParams.value);
	}
	// 合并后续 触底加载数据
	classList.value = [...classList.value, ...res.data];
	// 判断 后续是否还有数据
	if (queryParams.value.pageSize > res.data.length) {
		noData.value = true;
	}
	loading.value = false
	// 存储图片列表到 localStorage中
	uni.setStorageSync('storgClassList', classList.value);
};

onLoad((value) => {
	// type 指的是 ? 判断是历史浏览 还是 分类
	// {id: "6524a48f6523417a8a8b825d", name: "可爱萌宠"}
	const { id, name, type = null } = value;
	if (type) {
		queryParams.value.type = type;
	}
	// 如果id不存在 则提示返回 首页
	if (id) {
		queryParams.value.classid = id;
	}
	// 修改导航标题
	uni.setNavigationBarTitle({
		title: name
	});
	// 发送获取分类数据请求
	getClassList();
});

// 触底加载
onReachBottom(() => {
	// 判断是否后续还有数据，没有数据则不发送请求
	if (noData.value) {
		return;
	}
	// 页面加一
	queryParams.value.pageNum++;
	// 发送请求
	getClassList();
});
// 下拉刷新
onPullDownRefresh(() => {
	console.log('下拉刷新执行了');
	// 重置 页码
	queryParams.value.pageNum = 1;
	// 重置classList 数据
	classList.value = []
	// 发送请求
	getClassList();
	// 停止加载样式
	uni.stopPullDownRefresh()
});
// 离开页面
onUnload(()=>{
	// 清除 storage
	uni.removeStorageSync("storgClassList")
})
</script>

<style lang="scss" scoped>
.classlist {
	.content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item {
			height: 440rpx;
			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
</style>
