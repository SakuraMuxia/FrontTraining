<template>
    <el-card class="container">
        <!-- 设置插槽1 -->
        <div class="header_title">
            <slot name="header"></slot>
        </div>

        <!-- 设置插槽2 -->
        <div class="number">
            <slot name="number"></slot>
        </div>

        <!-- 设置插槽3 -->
        <div class="charts">
            <slot name="charts"></slot>
        </div>

        <!-- 设置插槽4 -->
        <div class="bottom">
            <slot name="bottom"></slot>
        </div>
    </el-card>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
// 定义颜色
$color: yellowgreen;

.container {
    .header_title {
        margin: 10px 0px;
        font-weight: 900;
        color: $color;
    }

    .number {
        color: $color;
        // 字体缩进
        text-indent: 10px;
        // 设置字体样式
        font-style: italic;
        font-weight: 900;
        margin-top: 5px;
        font-size: 20px;
        // 动画 动画名 动画时间 动画速度 动画延时时间 执行次数
        animation: donghua .5s ease-in-out 0s 1;
    }

    .charts {
        width: 100%;
        height: 80px;
        border-bottom: 1px solid yellowgreen;
        color: $color;
        // display: flex;
        // 主轴上的伸缩方式 居中
        // justify-content: center;
        // 侧轴上的伸缩方式 居中
        // align-items: center;
        font-size: 16px;
    }

    .bottom {
        color: $color;
        font-size: 14px;
        margin-top: 5px;
    }
}

//定义动画
@keyframes donghua {
    from {
        // 变换类型为 旋转 0度
        transform: rotate(0deg);
    }

    to {
        // 变换类型为 旋转 360度
        transform: rotate(360deg);
    }
}
</style>