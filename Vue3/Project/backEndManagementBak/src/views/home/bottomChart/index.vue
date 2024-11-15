<template>
    <el-row :gutter="10">
        <!-- 左侧卡片 -->
        <el-col :span="14">
            <el-card>
                <!-- 设置element card组件中的header插槽内容 -->
                <template #header>
                    <div class="top">
                        <span>关键字搜索</span>
                        <!-- 下拉框组件 -->
                        <el-dropdown>
                            <!-- 下拉框标题 -->
                            <span class="el-dropdown-link">城市选择器
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <!-- 下拉框内容 -->
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>北京</el-dropdown-item>
                                    <el-dropdown-item>上海 </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </template>
                <!-- 设置身体内容 -->
                <v-chart class="leida" :option="getRadar()" style="height: 300px"></v-chart>
            </el-card>
        </el-col>
        <!-- 右侧卡片 -->
        <el-col :span="10">
            <el-card>
                <!-- 卡片头部 -->
                <template #header>
                    <div class="top">
                        <div>分类销售</div>
                        <!-- 单选按钮 -->
                        <el-radio-group size="small" v-model="radio">
                            <el-radio-button value="品类" label="品类"/>
                            <el-radio-button value="商品" label="商品"/>
                        </el-radio-group>
                    </div>
                </template>
                <!-- 展示饼图 设置鼠标事件-->
                <v-chart ref="charts" style="height: 300px" :option="getPie()" @mouseover="handler"></v-chart>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
import { ArrowDown } from "@element-plus/icons-vue";
import { ref } from "vue";
// 元素ref对象
const radio = ref("品类");
const charts = ref();

// 右侧数据
//品类的数据
const arr1 = [{ name: '华为', value: 90 }, { name: 'oppo', value: 30 }, { name: 'vivo', value: 60 }, { name: '小米', value: 99 }];
//商品的数据
const arr2 = [{ name: '华为1', value: 190 }, { name: 'oppo1', value: 130 }, { name: 'vivo1', value: 160 }, { name: '小米1', value: 199 }]

//雷达图配置项
const getRadar = () => {
    return {
        title: {
            text: "王者荣耀",
        },
        // 设置图例
        legend: {
            data: ["男生", "女生"],
            right: 0,
            // 纵向排列
            orient: "vertical",
        },
        // 雷达结构
        radar: {
            indicator: [
                { name: "生存", max: 10000 },
                { name: "发育", max: 10000 },
                { name: "猥琐", max: 10000 },
                { name: "别浪", max: 10000 },
                { name: "我们会赢", max: 10000 },
                { name: "坚持就是胜利", max: 10000 },
            ],
            splitNumber: 5, // 将雷达图分成5层
        },
        series: [
            {
                name: "Budget vs spending",
                type: "radar",
                // 雷达数据
                data: [
                    {
                        value: [4200, 3000, 700, 400, 2000, 6000],
                        name: "男生",
                    },
                    {
                        value: [5000, 4000, 8000, 6000, 7000, 3000],
                        name: "女生",
                    },
                ],
            },
        ],
    };
};

//饼图的配置项
const getPie = () => {
    return {
        // 提示框
        tooltip: {
            trigger: "item", // 触发时机
        },
        // 图例
        legend: {
            right: "0",
            orient: 'vertical' // 设置纵向
        },
        series: [
            {
                type: "pie", // 类型为饼图
                //饼图半径
                radius: ["30%", "60%"],
                avoidLabelOverlap: false, // 标签放在中心位置

                itemStyle: { // 图形的样式
                    borderRadius: 10, // 图形的边角
                    borderColor: "#fff", // 描边的颜色
                    borderWidth: 2, // 描边的宽度
                },
                //设置标签标题
                label: {
                    show: true,
                },
                //高亮效果
                emphasis: {
                    label: { //高亮显示label标签
                        show: true,
                        fontSize: 20, // 设置视觉引导线字体大小
                        fontWeight: "bold", // 设置字体宽度
                    },
                },
                //视觉引导线
                labelLine: {
                    show: true,
                },
                //数据
                data: radio.value == '品类' ? arr1 : arr2,

            },
        ],
        //标题组件
        title: {
            //主标题
            text: radio.value == '品类' ? arr1[0].name : arr2[0].name, //主标题
            subtext: radio.value == '品类' ? arr1[0].value : arr2[0].value, //副标题
            //标题的位置
            left: 'center',
            top: 'center'
        }
    };
};

// 鼠标进入事件 params 默认是饼图的元素对象
const handler = (params: any) => {
    // 获取 饼图 实例对象,并使用实例对象上的 setOption方法
    // 重新设置 label的 内容 为 当前鼠标选中的 饼图元素对象 
    charts.value.setOption({
        title: { // 设置标题
            text: params.name, // 设置主标题
            subtext: params.value // 设置副标题
        }
    })

}
</script>

<style scoped lang="scss">
.top {
    display: flex;
    justify-content: space-between;
    color: yellowgreen;
    align-items: center;
}

.el-dropdown-link {
    cursor: pointer;
    color: yellowgreen;
    display: flex;
    align-items: center;
}

::v-deep(.el-dropdown) {
    color: yellowgreen;
}

.leida {
    height: 300px;
}

</style>