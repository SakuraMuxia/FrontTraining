<template>
    <div class="container">
        <!-- 自适应宽度 -->
        <v-chart autoresize :option="getOption()"></v-chart>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core'
// 导入水球图
import "echarts-liquidfill";
// 进度条的配置
// const getOption = () => {
//   return {
//       xAxis:{
//          //最大数值与最小数值
//          min:0,
//          max:100,
// 不显示
//          show:false
//       },
//       yAxis:{
//         //在y轴均匀分布
//         type:'category',
//         show:false

//       },
//       series:{
//         type:'bar',
//         data:[50],
//         //柱条的宽度
//         barWidth:10,
//         //设置柱条的背景颜色
//         showBackground:true,
//         backgroundStyle:{
//             color:'#ccc'
//         },
//         //文本标签
//         label:{
//             show:true,
//             //文字的位置
//             position:'right',
//             //内容自定义
//             formatter:'|',
//             color:'#5470c6'
//         }
//       },
//       grid:{
//         left:0,
//         top:0,
//         bottom:0,
//         right:0
//     },
//   };
// };
const value = 0.5;
//水球图的配置项
const getOption = () => {
    return {
        series: {
            type: "liquidFill",
            data: [0.6, 0.55, 0.4, 0.25],
            radius: "90%",
            label: {
                fontSize: 12,
            },
            outline: {
                show: false,
            },
            shape: "pin",
        },
    };
};
</script>
<style scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>