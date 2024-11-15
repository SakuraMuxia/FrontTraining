//分类全局组件小仓库
import { defineStore } from "pinia";

//引入vue3组合式API函数
import { ref } from 'vue';

// 导入数据类型
import type { CategoryResponseData } from "@/api/product/type/category";

//引入请求分类的API
import { getC1, getC2, getC3 } from '@/api/product/category';

// 创建切片 分类仓库
const useCategoryStore = defineStore('category',()=>{
    
    // 创建数据状态
    //一级分类的数据
    const c1Arr = ref<CategoryResponseData>([]);
    //二级分类的数据
    const c2Arr = ref<CategoryResponseData>([]);
    //三级分类的数据
    const c3Arr = ref<CategoryResponseData>([]);
    // 一级分类ID的字段
    const c1Id = ref<string | number>('');
    //二级分类的ID字段
    const c2Id = ref<string | number>('');
    //三级分类的ID字段
    const c3Id = ref<string | number>('');

    // 方法
    const getC1Data = async () => {
        const res:CategoryResponseData = await getC1()
        // 存储数据
        c1Arr.value = res
    }
    const getC2Data = async () => {
        const res:CategoryResponseData = await getC2(c1Id.value as number)
        // 存储数据
        c2Arr.value = res
    }
    const getC3Data = async () => {
        const res:CategoryResponseData = await getC3(c2Id.value as number)
        // 存储数据
        c3Arr.value = res
    }

    // 返回
    return {
        c1Arr,
        c2Arr,
        c3Arr,
        c1Id,
        c2Id,
        c3Id,
        getC1Data,
        getC2Data,
        getC3Data
    }
})
//对外暴露方法[默认暴露:引入的时候不需要花括号]
export default useCategoryStore;