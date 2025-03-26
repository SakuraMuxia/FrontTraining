<template>
	<view class="preview">
		<!-- 轮播图 -->
		<swiper circular :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<!-- 仅显示 当前图片附近的图片 -->
				<image v-if="lazyImgIndex.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState">
			<!-- 返回按键 -->
			<view class="goBack" @click="goBack" :style="{ top: getStatusBarHeight() + 'px' }">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<!-- 数量 -->
			<view class="count">{{ currentIndex + 1 }} / {{ classList.length }}</view>
			<!-- 当前时间 -->
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<!-- 当前时间 -->
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<!-- 底部 -->
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>

				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{ currentInfo.score }}分</view>
				</view>

				<view class="box" @click="clickDown">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>

		<!-- 弹出框 信息 -->
		<uni-popup ref="popupRef" type="bottom" border-radius="10px 10px 0 0">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="clickInfoClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID：</view>
							<text selectable class="value">{{ currentInfo._id }}</text>
						</view>

						<!-- <view class="row">
							<view class="label">分类：</view>
							<text class="value class">明星美女</text>
						</view> -->

						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">{{ currentInfo.nickname }}</text>
						</view>

						<view class="row">
							<text class="label">评分：</text>
							<view class="value roteBox" v-if="currentInfo.score">
								<uni-rate readonly touchable :value="currentInfo.score" size="16" />
								<text class="score">{{ currentInfo.score }}分</text>
							</view>
						</view>

						<view class="row">
							<text class="label">摘要：</text>
							<view class="value">{{ currentInfo.description }}</view>
						</view>

						<view class="row">
							<text class="label">标签：</text>
							<view class="value tabs">
								<view class="tab" v-for="tab in currentInfo.tabs" :key="tab">{{ tab }}</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
						<!-- 底部安全区域 -->
						<view class="safe-area-inset-bottom"></view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 弹出框 评分 点击蒙版不推出-->
		<uni-popup ref="scorePopupRef" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">{{ isScore ? '已评分' : '壁纸评分' }}</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="userScore" allowHalf :disabled="isScore" disabled-color="#FFCA3E" />
					<text class="text">{{ userScore }}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" :disabled="!userScore || isScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { getStatusBarHeight } from '@/utils/system.js';
import { getStorageClassList } from '@/utils/common.js';
import { apiSetScore, apiWriteDownload, apiWallDetail } from '../../api/class/class';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
// 遮罩层
const maskState = ref(true);
const popupRef = ref(null);
const scorePopupRef = ref();
// 响应式数据
const userScore = ref(0);
const currentId = ref(null);
const classList = ref([]);
// 仅显示 附近图片索引
const lazyImgIndex = ref([]);
const currentIndex = ref(0);
const currentInfo = ref({
	score:0,
	_id:"65e02ef9a7c432936b2d83cf",
	
});
// 评分状态
const isScore = ref(false);
//遮罩层状态
const maskChange = () => {
	maskState.value = !maskState.value;
};
// 信息回调
const clickInfo = () => {
	console.log('点击了信息');
	// 打开弹出框
	popupRef.value.open();
};
// 评分回调
const clickScore = () => {
	// 如果评过分了，设置评分标记为 true，显示评分数据
	if (currentInfo.value.userScore) {
		isScore.value = true;
		userScore.value = currentInfo.value.userScore;
	}
	// 打开弹出框
	scorePopupRef.value.open();
};
// 下载回调
const clickDown = async () => {
	// 条件编译 H5 的语法
	// #ifdef H5
	uni.showModal({
		content: '请长按保存壁纸',
		showCancel: false
	});
	// #endif
	// 非H5的语法
	// #ifndef H5
	try {
		// 提示
		uni.showLoading({
			title: '下载中...',
			mask: true
		});
		// 解构 classid 和 wallid
		let { classid, _id: wallId } = currentInfo.value;
		// 发送 下载 图片请求
		let res = await apiWriteDownload({
			classid,
			wallId
		});
		// 判断如果响应代码 不为 0 抛出异常
		if (res.errCode != 0) {
			throw res;
		}
		// 使用 uni API
		uni.getImageInfo({
			// 图片路径
			src: currentInfo.value.picurl,
			// 获取图片地址成功时回调
			success: (res) => {
				// console.log('获取图片地址成功时回调', res);
				// 保存到 相册 API
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					// 保存到相册成功时的回调
					success: (res) => {
						uni.showToast({
							title: '保存成功，请到相册查看',
							icon: 'none'
						});
					},
					// 保存到相册失败的回调
					fail: (err) => {
						// 用户取消
						if (err.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
							uni.showToast({
								title: '保存失败，请重新点击下载',
								icon: 'none'
							});
							return;
						}
						// 没有授权
						uni.showModal({
							title: '授权提示',
							content: '需要授权保存相册',
							// 提示成功弹出时的回调
							success: (res) => {
								if (res.confirm) {
									// 打开设置 API
									uni.openSetting({
										// 打开设置成功的回调
										success: (setting) => {
											// console.log(setting);
											// 开启写入到相册权限
											if (setting.authSetting['scope.writePhotosAlbum']) {
												uni.showToast({
													title: '获取授权成功',
													icon: 'none'
												});
											} else {
												uni.showToast({
													title: '获取权限失败',
													icon: 'none'
												});
											}
										}
									});
								}
							}
						});
					},
					// 最终处理
					complete: () => {
						// 关闭加载样式
						uni.hideLoading();
					}
				});
			}
		});
		// 存在异常
	} catch (err) {
		console.log(err);
		uni.hideLoading();
	}
	// #endif
};
// 信息弹出框关闭回调
const clickInfoClose = () => {
	console.log('关闭了弹出框');
	// 关闭了弹出框
	popupRef.value.close();
};
// 返回按钮回调
const goBack = () => {
	console.log('点击了返回');
	uni.navigateBack({
		success: () => {
			console.log('成功返回');
		},
		fail: (err) => {
			// 跳转到首页
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	});
};
// 评分弹出框关闭回调
const clickScoreClose = () => {
	console.log('评分弹出框关闭');
	scorePopupRef.value.close();
	// 设置评分为 0
	userScore.value = 0;
	// 评分标记为 false
	isScore.value = false;
};
// 提交评分
const submitScore = async () => {
	console.log('提交了评分');
	// 加载框
	uni.showLoading({
		title: '加载中'
	});
	// 解构,同时设置别名
	const { classid, _id: wallId } = currentInfo.value;
	// 发送请求
	const data = {
		classid,
		wallId,
		userScore: userScore.value
	};
	const res = await apiSetScore(data);
	// 对响应处理
	if (res.errCode === 0) {
		// 提示评分成功
		uni.showToast({
			title: '评分成功',
			icon: 'none'
		});
		// 修改 响应式数组中的 数据
		classList.value[currentIndex.value].userScore = userScore.value;
		// 设置已评分标记
		classList.value[currentIndex.value].isScore = true;
		// 存储到 localStorage中
		uni.setStorageSync('storgClassList', classList.value);
		// 关闭评分对话框
		clickScoreClose();
	}
};
// 获取 classList 并转换数据
const getClassListLarge = () => {
	classList.value = getStorageClassList().map((item) => {
		item.picurl = item.smallPicurl.replace('_small.webp', '.jpg');
		return item;
	});
	// console.log('classList.value', classList.value);
};
// 筛选图片呢索引和信息
const getPictureInfo = () => {
	nextTick(() => {
		// 获取当前图片的索引
		currentIndex.value = classList.value.findIndex((item) => {
			return item._id === currentId.value;
		});
		// 获取当前图片的信息
		currentInfo.value = classList.value[currentIndex.value];
	})
}
// 轮播图改变
const swiperChange = (val) => {
	// 改变当前索引
	currentIndex.value = val.detail.current;
	// 改变当前信息
	currentInfo.value = classList.value[currentIndex.value];
	// 仅加载当前图片附近图片
	lazyImgLoad();
};
// swiper懒加载效果 节省图片的网络流量(优化)
const lazyImgLoad = () => {
	// 向 lazyImgList数组中 添加 索引
	lazyImgIndex.value.push(
		// 边界情况 9 0 1
		currentIndex.value <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
		currentIndex.value,
		// 边界情况 8 9 0
		currentIndex.value >= classList.value.length - 1 ? 0 : currentIndex.value + 1
	);
	// Set数组
	lazyImgIndex.value = [...new Set(lazyImgIndex.value)];
};
// 分享给好友
onShareAppMessage((val) => {
	return {
		title: '咸虾米壁纸',
		path: '/pages/preview/preview?id=' + currentId.value + '&type=share'
	};
});
// 分享到朋友圈
onShareTimeline(() => {
	return {
		title: '咸虾米壁纸',
		query: 'id=' + currentId.value + '&type=share'
	};
});
// 获取详细壁纸
const getDetailWall = async () => {
	const data = {
		id: currentId.value
	};
	// 发送请求
	let res = await apiWallDetail(data);
	// 遍历-格式化数据-重新给classList赋值
	classList.value = res.data.map((item) => {
		return {
			...item,
			picurl: item.smallPicurl.replace('_small.webp', '.jpg')
		};
	});
	// 处理当前图片信息
	getPictureInfo()
};
// 调用 获取分类列表 classList
getClassListLarge();

// onLoad 回调
onLoad((val) => {
	// 获取 路由参数 图片的ID
	const { id, type } = val;
	currentId.value = id;
	// 获取路由参数中type，重新给classList赋值
	if (type === 'share') {
		getDetailWall();
	}
	// 获取当前图片的信息和索引
	getPictureInfo()
	
	// 仅加载当前图片附近图片
	lazyImgLoad();
});
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	// 轮播图
	swiper {
		width: 100%;
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
	// 遮罩层
	.mask {
		& > view {
			position: absolute;
			left: 0;
			margin: auto;
			color: #fff;
			right: 0;
			width: fit-content;
		}

		.goBack {
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 100px;
			top: 0;
			backdrop-filter: blur(10rpx);
			border: 1rpx solid rgba(255, 255, 255, 0.3);
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.count {
			top: 10vh;
			background: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}
		.time {
			font-size: 140rpx;
			top: calc(10vh + 80rpx);
			font-weight: 100;
			line-height: 1em;
			text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
		}
		.date {
			font-size: 34rpx;
			top: calc(10vh + 230rpx);
			text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
		}
		.footer {
			background: rgba(255, 255, 255, 0.8);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
			backdrop-filter: blur(20rpx);
			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 2rpx 12rpx;
				.text {
					font-size: 26rpx;
					color: $text-font-color-2;
				}
			}
		}
	}
	// 弹出框-信息
	.infoPopup {
		background: #fff;
		padding: 30rpx;
		border-radius: 30rpx 30rpx 0 0;
		overflow: hidden;
		scroll-view {
			max-height: 60vh;
			.content {
				.row {
					display: flex;
					padding: 16rpx 0;
					font-size: 32rpx;
					line-height: 1.7em;
					.label {
						color: $text-font-color-3;
						width: 120rpx;
						text-align: right;
						font-size: 30rpx;
					}
					.value {
						flex: 1;
						width: 0;
					}
					.roteBox {
						display: flex;
						align-items: center;
						.score {
							font-size: 26rpx;
							color: $text-font-color-2;
							padding-left: 10rpx;
						}
					}
					.tabs {
						display: flex;
						flex-wrap: wrap;

						.tab {
							border: 1px solid $brand-theme-color;
							color: $brand-theme-color;
							font-size: 22rpx;
							padding: 10rpx 30rpx;
							border-radius: 40rpx;
							line-height: 1em;
							margin: 4rpx 10rpx 10rpx 4rpx;
						}
					}
					.class {
						color: $brand-theme-color;
					}
				}

				.copyright {
					font-size: 28rpx;
					padding: 20rpx;
					background: #f6f6f6;
					color: #666;
					border-radius: 10rpx;
					margin: 20rpx 0;
					line-height: 1.6em;
				}
			}
		}
	}
	// 弹出框-评分
	.scorePopup {
		background: #fff;
		padding: 30rpx;
		width: 70vw;
		border-radius: 30rpx;
		.content {
			padding: 30rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			.text {
				color: #ffca3e;
				padding-left: 10rpx;
				width: 100rpx;
				line-height: 1em;
				text-align: center;
			}
		}
		.footer {
			padding: 10rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	// 弹出框标题样式
	.popHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			color: $text-font-color-2;
			font-size: 26rpx;
		}
		.close {
			padding: 6rpx;
		}
	}
}
</style>
