<template>
	<view class="noticeLayout">
		<view class="title">
			<view class="tag" v-if="noticeInfo.select" >
				<uni-tag inverted text="置顶" type="error" />
			</view>
			<view class="font">{{noticeInfo.title}}</view>
		</view>

		<view class="info">
			<view class="item">{{noticeInfo.author}}</view>
			<view class="item">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			<mp-html :content="noticeInfo.content" />
		</view>

		<view class="count">阅读 {{noticeInfo.view_count}}</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'	
import {onLoad} from "@dcloudio/uni-app"
import {apiNoticeDetail} from "@/api/class/class.js"

const noticeInfo = ref([])
let noticeId

// 获取公告详情接口
const getNoticeDetail = async() => {
	const params = {
		id:noticeId
	}
	await apiNoticeDetail(params).then((res)=>{
		noticeInfo.value = res.data
	}).catch((err)=>{
		console.log(err)
	})
}

onLoad((event)=>{
	noticeId = event.id
	getNoticeDetail();
})


</script>

<style lang="scss" scoped>
.noticeLayout {
	padding: 30rpx;
	.title {
		font-size: 40rpx;
		color: #111;
		line-height: 1.6em;
		padding-bottom: 30rpx;
		display: flex;
		.tag {
			transform: scale(0.8);
			transform-origin: left center;
			flex-shrink: 0;
		}
		.font {
			padding-left: 6rpx;
		}
	}
	.info {
		display: flex;
		align-items: center;
		color: #999;
		font-size: 28rpx;
		.item {
			padding-right: 20rpx;
		}
	}
	.content {
		padding: 50rpx 0;
	}
	.count {
		color: #999;
		font-size: 28rpx;
	}
}
</style>
