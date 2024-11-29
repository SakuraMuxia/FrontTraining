<template>
    <view class="card">
        <!-- 卡片顶部的标题 -->
        <view class="header">
            <text class="left">{{ title }}</text>
            <text class="right">{{ subtitle }}</text>
        </view>
        <!-- 插槽展示课程的地方 -->
        <slot name="content"></slot>
    </view>
</template>

<script setup lang='ts'>
// 接收父组件传来的 props
const props = defineProps(['title','subtitle'])
</script>

<style scoped lang="less">
.card{
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
}
.card .header{
    display: flex;
    justify-content: space-between;
    background: #3cc;
    color: white;
    border-radius: 10rpx;
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
}
</style>