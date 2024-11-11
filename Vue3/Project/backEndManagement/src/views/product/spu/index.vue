<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <!-- SPU table -->
            <div v-show="scene === 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    @click="addSpu"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px" :data="spuList" v-if="spuList.length">
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
                                @click="addSku(row)"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                @click="updateSpu(row)"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                @click="showSku(row)"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                @click="delSpu(row)"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分割线 -->
                <el-divider content-position="center" v-else>
                    <span style="color: aqua">暂无数据</span>
                </el-divider>
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
            <!-- spu form -->
            <SpuForm ref="spu" @changeScene="changescene" v-show="scene === 1"></SpuForm>
            <!-- sku form -->
            <SkuForm ref="sku" @changeSceneForSku="changesceneForsku" v-show="scene === 2"></SkuForm>
        </el-card>
        <!-- dialog -->
        <el-dialog title="SKU列表" v-model="showDailog">
            <el-table border :data="skuList" v-loading="tableLoading">
                <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                <el-table-column label="SKU价格" prop="price"></el-table-column>
                <el-table-column label="SKU重量" prop="weight"></el-table-column>
                <el-table-column label="SKU图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import SpuForm from './spuForm/index.vue'
import SkuForm from '@/views/product/spu/skuFrom/index.vue'
import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled,StarFilled  } from "@element-plus/icons-vue";
import type {SpuObjArr,SpuObj, SpuListResponseData, skuArr} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqDeleteSpu, reqSkuList, reqSpuList } from "@/api/product/spu";
import { ElMessage } from 'element-plus';

//获取子组件spuForm
const spu = ref<any>();
const sku = ref<any>();
//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<SpuObjArr>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);
// sku列表数据
const skuList = ref<skuArr>([])
// 控制dialog显示与隐藏
const showDailog = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
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

// 添加SPU
const addSpu = ()=>{
    //点击切换场景为1 (添加新的SPU|更新已有的SPU)
    scene.value = 1;
    // 父组件调用子组件方法
    spu.value.initDataForAddSpu(categoryStore.c3Id)
}

// 更新SPU
const updateSpu = (row:SpuObj) =>{
    // 切换场景
    scene.value = 1;
    // 通过ref对象调用子组件中的方法,并给子组件传参
    spu.value.initDataForEditSpu(row)
}

// 添加Sku
const addSku = (row:SpuObj) =>{
    // 切换场景
    scene.value = 2;
    // 父组件调用子组件方法
    sku.value.initDataForAddSku(categoryStore.c1Id,categoryStore.c2Id,row)
}

// 查看sku
const showSku = async (row:SpuObj)=>{
    // 清空数据
    skuList.value = []
    
    // 显示dialog
    showDailog.value = true;
    // 加载
    tableLoading.value=true
    // 发送请求
    skuList.value = await reqSkuList(row.id as number);
    // 加载取消
    tableLoading.value=false
}

// 删除spu
const delSpu = async(row:SpuObj)=>{
    await reqDeleteSpu(row.id as number).then(()=>{
        ElMessage({
            type: "success",
            message: "删除成功",
        })
        getHasSpuList()
    }).catch((err)=>{
        ElMessage({
            type: "error",
            message: "删除失败",
        })
    })
}

// 改变场景scene
const changescene = (val:number,flag:string) =>{
    // 修改scene的值
    scene.value = val
    //更新添加或者更新留在当前页或者第一页
    if (flag === "add") {
        //添加
        getHasSpuList();
    } else {
        //更新
        getHasSpuList(pageNo.value);
    }
}
const changesceneForsku = (val:number) =>{
    scene.value = val
}

</script>

<style scoped >
::v-deep(.el-button.is-disabled){
    background-color: orange !important;
}
</style>