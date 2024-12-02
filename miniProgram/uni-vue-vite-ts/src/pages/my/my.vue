<template>
	<view class="container user">
		<view class="info dark-mode">
			<h1 class="info_title">
				<image class="info_title_logo" :src="userInfo.avatar ? userInfo.avatar : '/static/logo.png'" />
				<text class="info_title_name">{{
					userInfo.nickname ? userInfo.nickname : "请登录"
				}}</text>
			</h1>
			<view class="info_list">
				<view class="info_item">
					<navigator class="item_a info-link" url="/pages/order/list/index">
						<uni-icons type="shop-filled" size="24" color="#333"></uni-icons>
						<text class="item_dsc">我的订单</text>
					</navigator>
				</view>
				<view class="info_item">
					<navigator class="item_a info-link" url="/pages/course/collect/index">
						<uni-icons type="vip-filled" size="24" color="#333"></uni-icons>
						<text class="item_dsc">我的收藏</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="list"></view>
		<view class="logout dark-mode info-link">退出登陆</view>
	</view>
</template>

<script lang="ts" setup>
import ajax from "@/api/index";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
//存储用户信息
const userInfo = ref<any>({});

// 获取个人信息
const getUserInfo = async () => {
	// 判断是否存在token
	const token = uni.getStorageSync("TOKEN");
	if (token) {
		// 获取用户信息:头像昵称,前提没有发一次，有了用户信息不需要再发请求获取用户信息
		if (!userInfo.value.nickname) {
			const result = await ajax.reqUserInfo();
			if (result.code == 200) {
				userInfo.value = result.data.item;
			}
		}
	} else { // token不存在
		uni.navigateTo({
			url: "/pages/login/login",
		});
	}
};

// 生命周期 onshow触发
onShow(() => {
	getUserInfo()
})

</script>

<style lang="less" scoped>
.user {
	height: 100vh;
	background: #eee;
}

.info {
	background: #00cc99;

	&_title {
		height: 97px;
		padding: 0 24px;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #eee;
		border-top: 1rpx solid #eee;

		&_logo {
			height: 60px;
			width: 60px;
			border-radius: 50%;
			background: #fff;
		}

		&_name {
			margin-left: 10px;
			color: #333;
			font-size: 20px;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			word-wrap: normal;
		}
	}

	&_list {
		display: flex;

		.info_item {
			width: 50%;
			text-align: center;

			.item_a {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 24px 0;
			}

			.item_dsc {
				font-size: 14px;
				margin-top: 8px;
			}
		}
	}
}

.logout {
	height: 52px;
	line-height: 52px;
	text-align: center;
	margin-top: 10px;
	background: #00cc99;
}

.popup_height {
	height: 100px;
	width: 100%;
	background: #fff;
}
</style>
