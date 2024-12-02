<template>
    <view class="box">
        <view class="item" v-for="(item, index) in list" :key="item.id" @click="goCourseDetial(item.id)">
            <image class="img" :src="type === 'course' ? item.cover : item.avatar" mode="widthFix" />
            <!-- 课程的结构 -->
            <view v-if="type === 'course'">
                <view class="title">{{ item.title }}</view>
                <view class="study">已有{{ item.viewCount }}学习</view>
                <view class="footer">
                    <view class="price">¥{{ item.price }}</view>
                    <view class="buy">已有{{ item.buyCount }}购买</view>
                </view>
            </view>
            <!-- 老师的结构-->
            <view v-else>
                <view class="info">{{ item.intro }}</view>
                <view class="name">{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
// 接收父组件传递的 列表数据
const props = defineProps(["list", "type"]);

//点击课程进入课程详情页
const goCourseDetial = (id: string) => {
    if (props.type == "course") {
        //跳转课程详情页-->携带id
        uni.navigateTo({
            url: `/pages/course/detail/detail?courseId=${id}`,
        })
    }
}
</script>

<style scoped lang="less">
.box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.box .item {
    width: 340rpx;
    margin: 20rpx 0rpx;
}

.box .item .img {
    width: 100%;
}

.box .item .title {
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 34rpx;
}

.box .item .study {
    font-size: 24rpx;
    margin: 10rpx 0rpx;
}

.box .item .footer {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
}

.box .item .footer .price {
    color: red;
}

.box .item .info {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
}

.box .item .name {
    color: #3cc;
    font-size: 36rpx;
    font-weight: 900;
    margin-top: 10rpx;
}
</style>