<template>
	<view class="userLayout pageBg">
		<custom-nav-bar title="个人中心" :noSearch="true"></custom-nav-bar>
		<view class="userInfo">
			<view class="avatar">
				<image src="../../static/images/logo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">145.45.45.45</view>
			<view class="address">来自于：河南</view>
		</view>
		<!-- 第一部分 -->
		<view class="section">
			<view class="list">
				<view @click="goClassify" class="row">
					<view class="left">
						<uni-icons type="download-filled" size="20"></uni-icons>
						<view class="text">我的下载</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view @click="goClassify" class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20"></uni-icons>
						<view class="text">我的评分</view>
					</view>
					<view class="right">
						<view class="text">0</view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>

				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20"></uni-icons>
						<view class="text">联系客服</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<!-- 第二部分 -->
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">订阅更新</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
				
				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">常见问题</view>
					</view>
					<view class="right">
						<view class="text"></view>
						<uni-icons type="right" size="15" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script setup>
const clickContact = () => {
	console.log('拨打电话');
	// 调用 uni API
	uni.makePhoneCall({
		phoneNumber:"10086"
	})
};
const goClassify = () => {
	uni.navigateTo({
		url: '/pages/classlist/classlist'
	});
}
</script>

<style lang="scss" scoped>
.userLayout {
	.userInfo {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.ip {
			font-size: 44rpx;
			color: #333;
			padding: 20rpx 0 5rpx;
		}
		.address {
			font-size: 28rpx;
			color: #aaa;
		}
	}
	// 第一部分
	.section {
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 30rpx;
		overflow: hidden;
		box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.05);
		.list {
			.row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				background: #fff;
				border-bottom: 1px solid #eee;
				position: relative;
				&:last-child {
					padding: 0 30rpx;
				}
				.left {
					display: flex;
					align-items: center;
					:deep() {
						.uni-icons {
							color: $brand-theme-color !important;
						}
					}
					.text {
						padding-left: 20rpx;
						color: #666;
					}
				}
				.right {
					display: flex;
					align-items: center;
					.text {
						font-size: 28rpx;
						color: #aaa;
					}
				}
				button {
					position: absolute;
					top: 0;
					left: 0;
					height: 100rpx;
					width: 100%;
					opacity: 0;
				}
			}
		}
	}
}
</style>
