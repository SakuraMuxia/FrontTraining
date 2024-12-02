<template>
    <image class="btn" src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/03de0936a7aafee76646b8b2d5fa5b4f.png"
        mode="scaleToFill" @click="toTop" />
</template>

<script setup lang="ts">

const toTop = () => {
    //点击图片页面滚动到顶部
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 200,
    })
}
</script>

<style scoped>
.btn {
    position: fixed;
    right: 0rpx;
    bottom: 100rpx;
    width: 100rpx;
    height: 100rpx;
}
</style>
