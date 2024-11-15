<template>
    <!-- 使用el栅格系统, 间隔为20px -->
    <el-row :gutter="20">
        <!-- 第一个图表 -->
        <el-col :span="6">
            <Card>
                <!-- 插槽1 -->
                <template #header>
                    <div>{{ data["//1"] }}</div>
                </template>
                <!-- 插槽2 -->
                <template #number>
                    <div>{{ data.salesToday }}</div>
                </template>
                <!-- 插槽3 -->
                <template #charts>
                    <div style="line-height: 30px">
                        日同比: {{ data.salesGrowthLastDay}} <svg t="1731636375963" style="height: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6459" width="32" height="32"><path d="M996.8 111.9c-78.5 0.1-157 0.1-235.5 0.1-1.2 0-2.3-0.1-3.5 0.1-8.3 1-14.3 5.2-17 13.3-2.5 7.3-0.2 15.4 5.6 20.4 4.6 3.9 10 4.9 15.8 4.9h182.5c1.7 0 3.6-0.5 5.8 0.7C839.7 266.3 729.1 381 618.2 496c-1.3-1.4-2.5-2.6-3.6-3.9-22.9-26.7-45.7-53.4-68.6-80.1-51.7-60.3-103.4-120.6-155-181-2.8-3.3-4.4-3-7.5-0.5-19.5 15.6-39.2 30.9-58.9 46.4-58.5 46-117.1 92-175.7 138-3 2.3-5.4 4.9-6.9 8.4-3.4 7.9-1 17.4 5.6 22.6 7.4 5.8 16.8 5.7 24.9-0.6l67.2-52.8c46.4-36.4 92.8-72.8 139-109.4 3.2-2.5 4.8-2.1 7.1 0.9 3.4 4.5 7.3 8.6 11 12.9 64 74.6 127.9 149.2 191.9 223.8 15.2 17.8 40.5 18.6 57 2 8.8-8.9 17.4-18 26.1-27L868.3 292c24.5-25.4 48.9-51 73.6-76.3 7-7.2 14.7-13.7 21.9-20.4v104.4c0 18.5-0.1 37 0 55.5 0.1 13.2 12.3 22.1 24.9 18.4 8.5-2.5 13.3-9.9 13.4-20.5 0-78.7 0-157.3 0.1-236-0.1-4.1-1.3-5.2-5.4-5.2z" p-id="6460" fill="#e90d4c"></path><path d="M988.8 453.9c-1.4-7.4-5.8-12.3-12.9-14.5-7-2.1-13.5-0.8-19 4.4-4.7 4.5-6.1 10-6.1 16.3 0.1 71.7 0 143.3 0 215v211c0 2.3-0.1 4.7 0 7 0.6 10.9 8.8 18.9 19.4 18.8 11.6-0.1 19.2-8.7 19.2-22.1v-429c0-2.2-0.2-4.6-0.6-6.9z" p-id="6461" fill="#e90d4c"></path><path d="M438.8 457.4c0-9.5-6.9-17.3-15.7-18.5-10.4-1.4-19.1 4.1-21.9 13.9-0.7 2.6-0.5 5.3-0.5 7.9v429.5c0 1.7 0 3.3 0.1 5 0.8 8.7 8.4 16.1 17.1 16.7 12.2 0.8 20.9-7.5 20.9-20V675.4 573.9c0-38.9 0.1-77.7 0-116.5zM230.6 479.7c-7 4.3-9.2 10.8-9.2 18.7 0.1 65.1 0.1 130.3 0.1 195.4v193.4c0 2.5-0.1 5 0.1 7.5 0.7 9.3 8.4 16.8 17.7 17.2 12 0.5 20.4-8 20.4-20.7V497.8v-2.5c-0.6-14.6-16.6-23.2-29.1-15.6zM809.9 494.9c-0.3-10.2-8.8-18-19-18-11.2 0-19.2 8.8-19.2 21v395.9c0.7 12.9 13.7 21.5 25.8 17 8.2-3 12.4-9.7 12.4-20.1V694.3 524.4c0.1-9.9 0.3-19.7 0-29.5zM617.3 592.9c-12.8-3.7-24.6 5.3-24.6 19-0.1 46.8 0 93.6 0 140.5v70c0 23.5-0.1 47 0 70.5 0 11.3 8.6 19.4 19.9 19.1 10.9-0.3 18.3-8.6 18.3-20.7V642.9c0-10.7 0.1-21.3 0-32-0.2-8.5-5.8-15.7-13.6-18zM43 592.9c-8.6 2.6-13.5 9.7-13.5 19.8v279.5c0 9.1 4.5 15.8 12.3 18.7 13.1 4.9 25.9-4.7 25.9-19.5V613v-3c-0.8-12.3-13-20.7-24.7-17.1z" p-id="6462" fill="#e90d4c"></path><path d="M92.4 459.4c-6.7 4.9-13.1 10.2-19.7 15.4C58.5 486 44.2 497.1 30 508.4c-7.4 5.9-9.8 14.1-6.8 22.2 2.8 7.6 9.9 12.4 18.5 12.4 4 0.2 7.9-1.2 11.2-3.9 21.2-16.6 42.5-33.2 63.6-50 5.7-4.6 8.2-10.9 6.6-18.3-3.1-14.5-18.6-20.3-30.7-11.4z" p-id="6463" fill="#e90d4c"></path></svg>
                    </div>
                    <div style="line-height: 30px">
                        月同比: {{ data.salesGrowthLastMonth}} <svg t="1731636890276" style="height: 20px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8466" width="32" height="32"><path d="M62.3 236.6h51.4v761.1H62.3zM1023.8 342.6l0.1 0.3-179.6 49.8-13.7-49.5 95.4-26.5L536.5 96.5 428.9 286.8l-25.3 44.7L0.1 103.4l25.3-44.7 358.8 202.8 132.9-235 44.7 25.3L951.2 272l-26.4-95.3 49.5-13.8 49.8 179.6zM266.9 349.7h51.4v648h-51.4z" fill="#1afa29" p-id="8467"></path><path d="M471.5 319.9h51.4v677.8h-51.4zM676.1 418h51.4v579.8h-51.4zM880.1 486.2h51.4v511.5h-51.4z" fill="#1afa29" p-id="8468"></path></svg>
                    </div>
                </template>
                <template #bottom>
                    <div>昨日销售额:{{ data.salesLastDay }}</div>
                </template>
            </Card>
        </el-col>
        <!-- 第二个图表 -->
        <el-col :span="6">
            <Card>
                <template #header>
                    <div>{{ data["//2"] }}</div>
                </template>
                <template #number>
                    <div>
                        {{ data.orderToday }}
                    </div>
                </template>
                <template #bottom>
                    <div>昨日订单{{ data.orderLastDay }}</div>
                </template>
                <template #charts>
                    <!-- 当数据存在时,再渲染数据,避免假报错 -->
                    <Line :data="data.orderTrend" v-if="data.orderTrend" />
                </template>
            </Card>
        </el-col>
        <!-- 第三个图表 -->
        <el-col :span="6">
            <Card>
                <template #header>
                    <div>{{ data["//3"] }}</div>
                </template>
                <template #number>
                    <div>
                        {{ data.orderUser }}
                    </div>
                </template>
                <template #bottom>
                    <div>退货率:{{ data.returnRate }}</div>
                </template>
                <template #charts>
                    <Bar :data="data.orderUserTrend" />
                </template>
            </Card>
        </el-col>
        <!-- 第四个图表 -->
        <el-col :span="6">
            <Card>
                <template #header>
                    <div>{{ data["//4"] }}</div>
                </template>
                <template #number>
                    <div>{{ data.usersTotal }}</div>
                </template>
                <template #bottom>
                    <div style="display:flex;justify-content:space-between">
                        <div>月同比:{{ data.userGrowthLastDay }}</div>
                        <div>日同比:{{ data.userGrowthLastMonth }}</div>
                    </div>
                </template>
                <template #charts>
                    <Watter/>
                </template>
            </Card>
        </el-col>

    </el-row>
</template>

<script setup lang='ts'>
import Card from "./card/index.vue";
//引入折线组件
import Line from "./line/index.vue";
import Bar from "./bar/index.vue";
import Watter from './watter/index.vue';
// 获取Home组件传来的数据
defineProps(["data"]);

</script>

<style scoped lang="less">
</style>