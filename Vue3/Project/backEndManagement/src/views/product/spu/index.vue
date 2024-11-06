<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <div v-show="scene == 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px" :data="spuList">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        label="SPU名称"
                        :resizable="false"
                        prop="spuName"
                        >
                    </el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column label="SPU操作">
                    <!-- row:代表即为某一个三级分类下已有的SPU -->
                        <template #="{ row, $index }">
                            <el-button
                                :icon="Plus"
                                type="primary"
                                size="small"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7]"
                    background
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="getHasSpuList"
                    @size-change="SizeChange"
                />
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled,StarFilled  } from "@element-plus/icons-vue";
import type {Records, SpuListResponseData} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqSpuList } from "@/api/product/spu";

//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<Records>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);

watch(()=>categoryStore.c3Id,()=>{
    // 清空SPU列表
    spuList.value = [];
    // 分页设置为0
    total.value = 0;
    categoryStore.c3Id && getHasSpuList();
})

// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}

// 每页数改变
const SizeChange = (value: number) => {
    pageSize.value = value;
    getHasSpuList();
}

</script>

<style scoped lang="less">
</style>