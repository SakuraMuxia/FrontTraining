<template>
	<view class="course">
		<view class="item" v-for="item in courseArr" :key="item.id" @click="goCourseDetial(item.id)">
			<view class="left">
				<image class="img" :src="item.cover" mode="widthFix" />
			</view>
			<view class="right">
				<view class="title">
					<uni-icons type="fire-filled" size="16" color="red"></uni-icons>{{ item.title }}
				</view>
				<view class="bottom">
					<view class="price">¥{{ item.price }}</view>
					<view class="buy">已有{{ item.buyCount }}人购买</view>
				</view>
			</view>
		</view>
		<view class="status" v-if="status == 'nomore'">
			<view class="line"></view>
			<view class="text">没有更多</view>
			<view class="line"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import ajax from "../../api/index"
import { ref } from "vue"
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
//默认页码
const page = ref(1);
//默认一页几条数据
const limit = ref(10);
//存储课程的数据
const courseArr: any = ref([]);
//存储下拉状态
const status = ref("");

//获取课程的方法
const getCourse = async () => {
	const result = await ajax.reqCouse(page.value, limit.value);
	// 先判断触底是否有下一次请求
	if (result.data.items.length == 10) {
		status.value = "more";
	} else {
		status.value = "nomore";
	}

	courseArr.value.push(...result.data.items);
}

//点击课程进入课程详情页
const goCourseDetial = (id: string) => {
	uni.navigateTo({
		url: `/pages/course/detail/detail?courseId=${id}`,
	})
}

//页面加载完毕
onLoad(() => {
	getCourse();
})

// 监听到底函数
onReachBottom(() => {
	if (status.value == "more") {
		page.value++
		getCourse()
	}
})

</script>

<style scoped>
.course {
	background: #ccc;
	width: 100%;
}

.course .item {
	background: white;
	margin: 10rpx 0rpx;
	display: flex;
	padding: 20rpx;
}

.course .item .img {
	width: 220rpx;
}

.course .item .right {
	margin-left: 20rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.course .item .right .title {
	font-weight: 900;
}

.course .bottom {
	display: flex;
	justify-content: space-between;
}

.course .bottom .price {
	color: red;
}

.status {
	color: red;
	font-weight: 900;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.status .line {
	width: 200rpx;
	height: 2rpx;
	background: red;
}
</style>
