<template>
    <div class="bar">
        <!-- autoresize:自适应 -->
        <!-- 通过option属性设置配置项 -->
        <v-chart :option="getOption()" autoresize></v-chart>
    </div>
</template>

<script setup lang="ts">
const getOption = () => {
    return {
        xAxis: {
            // x轴均匀分布
            type: "category",
            // x轴不显示
            show: false,
        },
        yAxis: {
            // y轴不显示
            show: false,
        },
        series: {
            // 类型为柱状图
            type: "bar",
            // 传递数据
            data: barData.data
        },
        grid: {
            // 设置布局
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        //提示框组件
        tooltip: {
            // 设置指示器的类型为 十字准星
            axisPointer: {
                type: "cross",
            },
        },
    };

};

const barData = defineProps(["data"]);
</script>

<style scoped>
.bar {
    width: 100%;
    height: 100%;
}
</style>