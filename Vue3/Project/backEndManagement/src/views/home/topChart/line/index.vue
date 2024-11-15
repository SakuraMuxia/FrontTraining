<template>
    <!-- 容器:具有一定高度 -->
    <div class="box" ref="line">专门开发折线图</div>
</template>

<script setup lang='ts'>
// 导包
import * as echarts from "echarts";

import { ref, onMounted } from "vue";
// 获取divDOM元素
const line = ref();
// 获取父组件传值
const dataLine = defineProps(["data"]);

// 挂载完成后执行
onMounted(() => {
    initLine();
})
//初始化echarts实例
const initLine = () => {
    // 初始化实例
    const mycharts = echarts.init(line.value);
    //设置配置项
    mycharts.setOption({
        // x轴
        xAxis: {
            // 均匀分布
            type: "category",
            //两个不留白
            boundaryGap: false,
            //隐藏x轴
            show: false,
            //指示器
            axisPointer: {
                //显示指示器
                show: true,
                //指示器的类型
                type: "line",
            },
        },
        yAxis: {
            //隐藏y轴
            show: false,
        },
        series: {
            // 类型为折线图
            type: "line",
            data: dataLine.data,
            //圆滑曲线
            smooth: true,
            //区域填充颜色
            areaStyle: {
                color: "skyblue",
            },
            //拐点隐藏
            symbol: "none",
        },
        //调整布局
        grid: {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            show: true,
            backgroundColor: "rgba(10,120,90,.1)",
        },
        //提示框组件
        tooltip: {
            //显示提示款在容器内
            confine: true,
            backgroundColor: "rgba(10,120,90,.1)",
        },
    });

    //图形图标自适应
    window.onresize = function () {
        //图标的自适应,使用实例的方法
        mycharts.resize();
    };
};
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
}
</style>