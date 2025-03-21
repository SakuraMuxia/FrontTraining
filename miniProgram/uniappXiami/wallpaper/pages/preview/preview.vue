<template>
	<view class="preview">
		
		<!-- 轮播图 -->
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image @click="maskChange" src="../../common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState">
			<!-- 返回按键 -->
			<view class="goBack" @click="goBack" :style="{ top: getStatusBarHeight() + 'px' }">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<!-- 数量 -->
			<view class="count">3 / 9</view>
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
					<view class="text">5分</view>
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
							<text selectable class="value">12312312adfa</text>
						</view>

						<view class="row">
							<view class="label">分类：</view>
							<text class="value class">明星美女</text>
						</view>

						<view class="row">
							<view class="label">发布者：</view>
							<text class="value">咸虾米</text>
						</view>

						<view class="row">
							<text class="label">评分：</text>
							<view class="value roteBox">
								<uni-rate readonly touchable value="3.5" size="16" />
								<text class="score">5分</text>
							</view>
						</view>

						<view class="row">
							<text class="label">摘要：</text>
							<view class="value">摘要文字内容填充部分，摘要文字内容填充部分，摘要文字内容填充部分，摘要文字内容填充部分。</view>
						</view>

						<view class="row">
							<text class="label">标签：</text>
							<view class="value tabs">
								<view class="tab" v-for="item in 3">标签名</view>
							</view>
						</view>

						<view class="copyright">
							声明：本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸，维护您的权益。
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 弹出框 评分 点击蒙版不推出-->
		<uni-popup ref="scorePopupRef" :is-mask-click="false">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸评分</view>
					<view class="close" @click="clickScoreClose">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate v-model="userScore" allowHalf />
					<text class="text">{{ userScore }}分</text>
				</view>

				<view class="footer">
					<button @click="submitScore" :disabled="!userScore" type="default" size="mini" plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	
	
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHeight } from '@/utils/system.js';
// 遮罩层
const maskState = ref(true);
const popupRef = ref(null);
const scorePopupRef = ref();
// 响应式数据
const userScore = ref(0);

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
	console.log('点击了评分');
	// 打开弹出框
	scorePopupRef.value.open()
};
// 下载回调
const clickDown = () => {
	console.log('点击了下载');
};
// 信息弹出框关闭回调
const clickInfoClose = () => {
	console.log('关闭了弹出框');
	// 关闭了弹出框
	popupRef.value.close()
};
// 返回按钮回调
const goBack = () => {
	console.log('点击了返回');
	uni.navigateBack()
};
// 评分弹出框关闭回调
const clickScoreClose = () => {
	console.log('评分弹出框关闭');
	scorePopupRef.value.close()
};
// 提交评分
const submitScore = () => {
	console.log('提交了评分');
};

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
