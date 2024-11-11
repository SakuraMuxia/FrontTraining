<template>
    <el-card>

        <el-table border style="margin: 10px 0px" :data="skuList">
            <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
            <el-table-column label="名称" width="180px" prop="skuName"></el-table-column>
            <el-table-column label="描述" width="180px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="180px">
                <!-- 代表SKU:商品 -->
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="重量" width="180px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="180px" prop="price"></el-table-column>
            <el-table-column label="操作" width="280px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        size="small"
                        :type="row.isSale ? 'warning' : 'danger'"
                        @click="changeSale(row)"
                        :icon="row.isSale ? Bottom : Top">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="updateSku(row)"
                        :icon="Edit">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="findSkuInfo(row)"
                        :icon="InfoFilled">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="delSku(row.id)"
                        :icon="Delete">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasSku"
            @size-change="changeSize"
        />

        <!-- 抽屉组件 -->
        <el-drawer title="查看商品的详情" v-model="showDrawer">
            <el-divider content-position="left">商品信息</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">名称</el-col>
                <el-col :span="16">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-divider content-position="left">商品描述</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品描述</el-col>
                <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-divider content-position="left">商品价格</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品价格</el-col>
                <el-col :span="16">{{ skuInfo.price }}</el-col>
            </el-row>
            <el-divider content-position="left">平台属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">平台属性</el-col>
                <el-col :span="16">
                    <el-tag 
                        :key="item.id"
                        v-for="(item, index) in skuInfo.skuAttrValueList"
                        style="margin: 4px">{{ item.valueName }}
                    </el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">销售属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">销售属性</el-col>
                <el-col :span="16">
                    <el-tag
                        round
                        v-for="(item, index) in skuInfo.skuSaleAttrValueList"
                        :key="item.id"
                        style="margin: 4px">{{ item.saleAttrValueName }}
                    </el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品图片</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品图片</el-col>
                <el-col :span="16">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                        <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
                    </el-carousel-item>
                </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { Top, Bottom, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reqDeleteSku, reqSkuInfo, reqSkuList, reqSkuOffline, reqSkuOnline } from "@/api/product/sku";
import type { SkuListResponseData,Records } from '@/api/product/type/sku';

// 分页器默认的页码
const pageNo = ref<number>(1);
// 每一页数据的条数
const pageSize = ref<number>(10);
// 存储商品的总个数
const total = ref<any>(0);
// 存储商品列表
const skuList = ref<Records>([]);
// 抽屉组件的展示
const showDrawer = ref<boolean>(false)
// 商品信息的存储
const skuInfo = ref<any>({})

// 挂载
onMounted(()=>{
    getHasSku()
})

// 获取SKU列表
const getHasSku = async (value: number = 1) =>{
    // 收集当前页码
    pageNo.value = value
    const result: SkuListResponseData = await reqSkuList(pageNo.value, pageSize.value)
    // 存储商品列表
    skuList.value = result.records
    // 存储商品总数
    total.value = result.total
}
// 改变每页总数
const changeSize = async(val:number)=>{
    // 修改数据
    pageSize.value = val
    getHasSku()
}
// 改变销售状态
const changeSale = async (row:any)=>{
    // 判断当前商品的销售状态
    if (row.isSale == 1) {
        // 下线
        await reqSkuOffline(row.id);
        //提示消息
        ElMessage({
            type: "success",
            message: "下架成功",
        })
    }else{
        await reqSkuOnline(row.id)
        ElMessage({
            type: "success",
            message: "上架成功",
        })
    }
    // 刷新页面 设置完 停留在当前页面
    getHasSku(pageNo.value)
}
// 更新已有的sku
const updateSku = (row: any) => {
    ElMessage({
        type: "success",
        message: "程序正在努力开发....",
    })
};
// 获取商品sku信息
const findSkuInfo = async (row: any)=>{
    showDrawer.value = true;
    const result = await reqSkuInfo(row.id)
    skuInfo.value = result
}
// 删除商品sku数据
const delSku = async (id: number) =>{
    reqDeleteSku(id).then(() => {
        ElMessage({
            type: "success",
            message: "删除成功",
        })
    })
    // 刷新页面 设置完 停留在当前页面
    getHasSku(pageNo.value)
}
</script>

<style scoped >

::v-deep(.is-active){
    background-color: red !important;
}

::v-deep .el-carousel__button {
  width: 10px;
  height: 10px;
  background: aqua;
  border-radius: 50%;
}

</style>