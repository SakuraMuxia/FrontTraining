<template>
    <el-card>
        <!-- 设置行内 -->
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="handleChangeC1" :disabled="scene==0?false:true" style="width: 200px">
                    <!-- option:label 决定用户展示的选项 -->
                    <el-option :key="c1.id" v-for="(c1,index) in categoryStore.c1Arr" :label="c1.name" :value="c1.id"/>
                </el-select>
            </el-form-item>
            
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="handleChangeC2" :disabled="scene==0?false:true" style="width: 200px">
                    <!-- option:label 决定用户展示的选项 -->
                    <el-option :key="c2.id" v-for="(c2,index) in categoryStore.c2Arr" :label="c2.name" :value="c2.id"/>
                </el-select>
            </el-form-item>

            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" :disabled="scene==0?false:true" style="width: 200px">
                    <!-- option:label 决定用户展示的选项 -->
                    <el-option :key="c3.id" v-for="(c3,index) in categoryStore.c3Arr" :label="c3.name" :value="c3.id"/>
                </el-select>
            </el-form-item>

        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
//为什么这里需要使用pinia仓库?(不用也可以)
//因为当前一级、二级、三级分类id,父组件获取属性需要,涉及到组件通信[自定义事件:子->父]、pinia
import useCategoryStore from "@/stores/category";
import { onMounted, onUnmounted } from "vue";

// 接收props
defineProps(['scene'])

//获取分类的小仓库
const categoryStore = useCategoryStore()

// 生命周期
onMounted(()=>{
    //通知pinia调用getC1,获取一级分类的数据
    categoryStore.getC1Data()
})

//组件销毁钩子
onUnmounted(() => {

    //清空仓库全部的数据---只能是选择是API清空仓库数组，组合式API写法不行
    // categoryStore.$reset();
    categoryStore.c1Id = "";
    categoryStore.c2Id = "";
    categoryStore.c3Id = "";
    categoryStore.c1Arr = [];
    categoryStore.c2Arr = [];
    categoryStore.c3Arr = [];

});

// handle change事件回调
const handleChangeC1 = () => {

    //清除二级分类上一次收集的ID
    categoryStore.c2Id = "";
    //清除三级分类的ID与数组数据
    categoryStore.c3Id = "";
    categoryStore.c3Arr = [];
    //获取二级分类的数据
    categoryStore.getC2Data();

}
const handleChangeC2 = () => {
    //清除三级分类的ID
    categoryStore.c3Id = "";
    //获取三级分类的数据
    categoryStore.getC3Data();
}

</script>

<style scoped lang="less">
</style>