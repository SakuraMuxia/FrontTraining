<template>
	<view class="searchLayout">
		<!-- 搜索栏 -->
		<view class="search">
			<uni-search-bar @confirm="onSearch" @cancel="onClear" @clear="onClear" focus placeholder="搜索" v-model="queryParams.keyword"></uni-search-bar>
		</view>
		<!-- 最近搜索 -->
		<view v-if="!pictureList.length || noSearch">
			<view class="history" v-if="historySearch.length">
				<view class="topTitle">
					<view class="text">最近搜索</view>
					<view class="icon" @click="removeHistory">
						<uni-icons type="trash" size="25"></uni-icons>
					</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in historySearch" :key="tab" @click="clickTab(tab)">{{ tab }}</view>
				</view>
			</view>

			<view class="recommend">
				<view class="topTitle">
					<view class="text">热门搜索</view>
				</view>
				<view class="tabs">
					<view class="tab" v-for="tab in hotSearch" :key="tab" @click="clickTab(tab)">{{ tab }}</view>
				</view>
			</view>
		</view>
		<!-- 空数据 -->
		<view class="noSearch" v-if="noSearch">
			<uv-empty mode="search" icon=""></uv-empty>
		</view>
		<!-- 搜索内容 -->
		<view v-else>
			<view class="list">
				<navigator :url="`/pages/preview/preview?id=${item._id}`" class="item" v-for="item in pictureList" :key="item._id">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</navigator>
			</view>
			<view class="loadingLayout" v-if="noData || pictureList.length">
				<uni-load-more :status="noData ? 'noMore' : 'loading'" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onUnload, onReachBottom } from '@dcloudio/uni-app';
import { apiSearchData } from '@/api/class/class.js';

// 图片列表
const pictureList = ref([]);
const historySearch = ref([]);
const hotSearch = ref(['美女', '帅哥', '宠物', '卡通']);
const noSearch = ref(false);
const noData = ref(false);
// 查询参数
const queryParams = ref({
	keyword: ''
});

// 获取搜索数据列表
const getSearchDataList = async () => {
	await apiSearchData(queryParams.value)
		.then((res) => {
			// 把后续的数据合并到前边
			pictureList.value = [...pictureList.value, ...res.data];
			// 存储到 localStorage中
			uni.setStorageSync('storgClassList', pictureList.value);
			// 判断后续是否还有数据
			if (queryParams.value.pageSize > res.data.length) noData.value = true;
			// 判断搜索结果是否为空
			if (res.data.length == 0 && pictureList.value.length == 0) noSearch.value = true;
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			// 隐藏加载框
			uni.hideLoading();
		});
};

// 确认搜索
const onSearch = () => {
	console.log('确认搜索');
	// 首次搜索按钮 加载提示框
	uni.showLoading();
	// 添加到历史搜索列表
	historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
	// 存储缓存到历史搜索列表
	uni.setStorageSync('historySearch', historySearch.value);
	// 初始化数据
	initParams(queryParams.value.keyword)
	// 发送请求
	getSearchDataList();
};
// 取消搜索
const onClear = () => {
	// 初始化参数
	initParams();
};
// 删除搜索历史记录
const removeHistory = () => {
	// 使用对话框
	uni.showModal({
		title: '是否清空历史搜索？',
		success: (res) => {
			if (res.confirm) {
				uni.removeStorageSync('historySearch');
				historySearch.value = [];
			}
		}
	});
};
// 点击tab回调
const clickTab = (value) => {
	// 初始化数据，同时把value传递给Params
	initParams(value);
	// 发送请求
	getSearchDataList();
};
// 初始化数据
const initParams = (value = '') => {
	// 搜索结果列表为空
	pictureList.value = [];
	// 标记复位
	noData.value = false;
	noSearch.value = false;
	// 参数复位
	queryParams.value = {
		pageNum: 1,
		pageSize: 12,
		keyword: value || ''
	};
};
//触底加载更多
onReachBottom(() => {
	// 如果后续没有数据，则不返回
	if (noData.value) return;
	// 页码加1
	queryParams.value.pageNum++;
	// 发送请求
	getSearchDataList();
});

// 卸载页面
onUnload(()=>{
	uni.removeStorageSync("storgClassList",pictureList.value);	
})
</script>

<style lang="scss" scoped>
.searchLayout {
	.search {
		padding: 0 10rpx;
	}
	.topTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		color: #999;
	}
	.history {
		padding: 30rpx;
	}
	.recommend {
		padding: 30rpx;
	}
	.tabs {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
		.tab {
			background: #f4f4f4;
			font-size: 28rpx;
			color: #333;
			padding: 10rpx 28rpx;
			border-radius: 50rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;
		}
	}
	.list {
		// grid 布局
		display: grid;
		// 每列3个
		grid-template-columns: repeat(3, 1fr);
		// 间隙5rpx
		gap: 5rpx;
		padding: 20rpx 5rpx;
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
