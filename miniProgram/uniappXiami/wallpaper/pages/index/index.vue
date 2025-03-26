<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
		<!-- 轮播图 -->
		<view class="banner">
			<swiper circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff" autoplay>
				<swiper-item v-for="item in bannerList" :key="item._id">
					<!-- 判断图片的性质 跳转到其他 微信小程序-->
					<navigator v-if="item.target == 'miniProgram'" :url="item.url" class="like" target="miniProgram" :app-id="item.appid">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<!-- 普通图片跳转在本程序内的其他页面 -->
					<navigator v-else :url="`/pages/classlist/classlist?${item.url}`" class="like">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="notice">
			<!-- 左侧 -->
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<!-- 中间 -->
			<view class="center">
				<swiper vertical autoplay interval="1500" duration="300" circular>
					<swiper-item v-for="item in noticeList" :key="item._id">
						<navigator :url="'/pages/notice/notice?id=' + item._id">
							{{ item.title }}
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 右侧 -->
			<view class="right">
				<uni-icons type="right" size="16" color="#333"></uni-icons>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="recommend">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="date">
						<uni-icons type="calendar" size="20"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<!-- 内容 -->
			<view class="content">
				<scroll-view scroll-x>
					<view class="box" v-for="(item, index) in suggestList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 精选 -->
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="reLaunch" class="more">
						<uni-icons type="forward" size="30" color="green"></uni-icons>
					</navigator>
				</template>
			</common-title>
			<!-- 内容 -->
			<view class="content">
				<theme-item v-for="(item, index) in classifyList" :key="item._id" :item="item"></theme-item>
				<theme-item :isMore="true"></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { apiGetBanner, apiGetClassify, apiGetDayRandom, apiGetNotice } from '@/api/home/home.js';

const bannerList = ref([]);
const noticeList = ref([]);
const suggestList = ref([]);
const classifyList = ref([]);

const goPreview = (id) => {
	// 把推荐列表 存储到 localStorage中
	uni.setStorageSync('storgClassList', suggestList.value);
	uni.navigateTo({
		url: '/pages/preview/preview?id=' + id
	});
};

// 获取首页banner图
const getBannerList = async () => {
	await apiGetBanner()
		.then((res) => {
			// 存储banner图片
			bannerList.value = res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取 公告列表
const getNoticeList = async () => {
	const params = {};
	await apiGetNotice()
		.then((res) => {
			noticeList.value = res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取推荐列表
const getDayRandom = async () => {
	await apiGetDayRandom()
		.then((res) => {
			suggestList.value = res.data;
		})
		.catch((err) => {
			console.log(err);
		});
};
// 获取分类
const getClassify = async () => {
	const data = {
		select: true // 无需 pageNum和pageSize
	};
	await apiGetClassify(data)
		.then((res) => {
			classifyList.value = res.data
		})
		.catch((err) => {
			console.log(err);
		});
};
onReady(() => {
	// 调用获取首页banner图
	getBannerList();
	// 获取公告
	getNoticeList();
	// 调用获取推荐列表
	getDayRandom();
	// 获取分类
	getClassify();
});
</script>

<style lang="scss" scoped>
.homeLayout {
	.banner {
		width: 750rpx;
		// 设置图片的左右间隔
		padding: 30rpx 0;
		swiper {
			width: 750rpx;
			height: 340rpx;
			&-item {
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				.like {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
		}
	}
	// 公告
	.notice {
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin: 0 auto;
		border-radius: 80rpx;
		display: flex;
		.left {
			width: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
			.text {
				color: $brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.center {
			flex: 1;
			swiper {
				height: 100%;
				&-item {
					height: 100%;
					font-size: 30rpx;
					color: #666;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}
		.right {
			width: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	// 精选
	.recommend {
		padding-top: 50rpx;
		.date {
			color: $brand-theme-color;
			display: flex;
			align-items: center;
			:deep() {
				.uni-icons {
					color: $brand-theme-color !important;
				}
			}
			.text {
				margin-left: 5rpx;
			}
		}
		.content {
			width: 720rpx;
			margin-left: 30rpx;
			margin-top: 30rpx;
			scroll-view {
				white-space: nowrap;
				.box {
					width: 200rpx;
					height: 430rpx;
					display: inline-block;
					margin-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.box:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
	.theme {
		padding: 50rpx 0;
		.more {
			font-size: 32rpx;
			color: #888;
		}
		.content {
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3, 1fr);
		}
	}
}
</style>
