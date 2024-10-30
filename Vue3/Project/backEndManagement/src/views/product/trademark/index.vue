<template>
    <el-card shadow="hover">
        <!-- 顶部按钮 -->
        <el-button type="primary" :icon="Plus" >添加品牌</el-button>
        <el-button type="primary" :icon="Download" >导出数据</el-button>
        <!-- 表格 -->
        <el-table :data="tradeMarkList" style="width: 100%;margin:10px 0px" border>
            <el-table-column label="序号" width="90" align="center" type="index"/>
            <el-table-column label="品牌名称" prop="tmName"/>
            <el-table-column label="品牌LOGO" prop="logoUrl">
                <template #="{row,$index}">
                    <img :src="row.logoUrl" alt="" style="width: 100px;height:100px">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="scope">
                    <el-button type="warning" size="small" :icon="Edit" circle />
                    <el-button type="danger" size="small" :icon="Delete" circle />
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 layout中的->:把右侧的放在最右侧 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7]"
            :size="size"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script setup lang='ts'>
import { Plus,Download,Edit,Delete } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { reqTradeMark } from '@/api/product/trademark'
import type {TradeMarkResponseData,Records} from '@/api/product/type/trademark'

// 表格相关
const tradeMarkList = ref<Records>([])
// 分页相关
const pageNo = ref<number>(1)
const pageSize = ref(3)
const size = ref<ComponentSize>('default')
const total = ref<number>(0)
// 生命周期
onMounted(()=>{
    getTradeMarkList()
})

// 获取品牌列表数据方法
const getTradeMarkList = async(val:number=1) =>{
    pageNo.value = val
    const result:TradeMarkResponseData = await reqTradeMark(pageNo.value,pageSize.value)
    // 修改品牌列表数据
    tradeMarkList.value = result.records
    total.value = result.total
}

const handleSizeChange = (val: number) => {
    pageSize.value = val
    getTradeMarkList()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<style scoped lang="less">
</style>