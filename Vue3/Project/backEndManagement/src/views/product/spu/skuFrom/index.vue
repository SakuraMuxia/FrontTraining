<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请你输入SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="SKU价格">
            <el-input
                placeholder="请你输入SKU价格"
                v-model="skuParams.price"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU重量">
            <el-input
                placeholder="请你输入SKU重量"
                v-model="skuParams.weight"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input
                placeholder="请你输入SKU描述"
                v-model="skuParams.skuDesc"
                type="textarea">
            </el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item
                    style="margin-top:10px"
                    label-width="80px"
                    :key="platAttrValue.id"
                    :label="platAttrValue.attrName"
                    v-for="(platAttrValue, index) in platAttrValueList">
                    <el-select style="width: 260px;" v-model="platAttrValue.attrNameIdAndValueIdTmp">
                        <el-option
                            v-for="(item, index) in platAttrValue.attrValueList"
                            :label="item.valueName"
                            :key="item.id"
                            :value="`${platAttrValue.id}:${item.id}`">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item
                    style="margin-top:10px"
                    label-width="80px"
                    :label="saleAttrValue.saleAttrName"
                    v-for="(saleAttrValue, index) in saleAttrValueList"
                    :key="saleAttrValue.baseSaleAttrId">
                    <el-select style="width: 260px;" v-model="saleAttrValue.saleNameIdAndValueIdTmp">
                        <el-option
                            v-for="(item, index) in saleAttrValue.spuSaleAttrValueList"
                            :label="item.saleAttrValueName"
                            :key="item.id"
                            :value="`${saleAttrValue.baseSaleAttrId}:${item.id}`">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border ref="table" :data="imageList">
                <el-table-column type="selection" align="center" width="80px"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button
                            @click="changeDefaultImage(row)"
                            :type="row.isDefault ? 'warning' : 'danger'"
                            size="small">
                            {{ row.isDefault ? "默认图片" : "设置默认" }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button size="default" @click="$emits('changeSceneForSku', 0)">取消</el-button>
        </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { reqAttrList } from "@/api/product/attr";
import { reqAddSku, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu";
import type { Attr, AttrResponseData } from "@/api/product/type/attr";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SaleAttrObj, skuParamsObj, SpuObj } from "@/api/product/type/spu";
import { ElMessage } from "element-plus";
import { nextTick, ref } from "vue";

const table = ref<any>()

const skuParams = ref<skuParamsObj>({
    //父组件传递过来数据
    category3Id: "", //三级分类的ID
    spuId: "", //SPU的ID
    tmId: "", //SPU归属于哪一个品牌
    //v-model
    skuName: "", //SKU名字
    price: "", //SKU价格
    weight: "", //SKU重量
    skuDesc: "", //SKU商品的描述
    skuDefaultImg: "", //默认图片的地址
    skuAttrValueList: [
        //收集平台属性的数据
        // {
        //   attrId: "", //平台属性的ID
        //   valueId: "", //平台属性值的ID
        // },
    ],
    skuSaleAttrValueList: [
        //收集销售属性
        // {
        //   saleAttrId: "", //销售属性的ID
        //   saleAttrValueId: "", //属性值的ID
        // },
    ],
})

// 存储平台属性
const platAttrValueList = ref<AttrResponseData>([])
// 存储销售属性
const saleAttrValueList = ref<SaleAttrArr>([]);
// 存储照片墙的数据
const imageList = ref<ImageArr>([]);


// 初始化数据
const initDataForAddSku = async (c1Id:number|string,c2Id:number|string,data:SpuObj) =>{
    // 清空数据
    reset()
    // 收集数据
    skuParams.value.category3Id = data.category3Id;
    skuParams.value.spuId = data.id as number;
    skuParams.value.tmId = data.tmId;
    //获取某一个三级分类下全部平台属性
    const result1: AttrResponseData = await reqAttrList(c1Id, c2Id, data.category3Id);
    //获取某一个SPU下拥有销售属性
    const result2: SaleAttrArr = await reqSpuHasSaleAttr(data.id as number);
    //获取某一个SPU旗下照片墙的数据
    const result3: ImageArr = await reqImageList(data.id as number);
    platAttrValueList.value = result1;
    saleAttrValueList.value = result2;
    // 调用初始设置照片墙
    handleImage(result3)

}
// 提交
const save = async() =>{
    // 处理销售属性和平台属性数据
    handleSaleAndPlatData()
    // 发送请求
    await reqAddSku(skuParams.value).then(()=>{
        //提示
        ElMessage({
            type: "success",
            message: "添加成功",
        });
        // 切换场景
        $emits("changeSceneForSku", 0);
    }).catch((err)=>{
        console.log(err)
    })
}

// 初始设置照片墙
const handleImage = (res:ImageArr)=>{
    // 如果存在照片,修改数据结构
    if (res.length) {
        // 排他
        for (var i = 0; i < res.length; i++) {
            res[i].isDefault = false;
        }
        // 第一张设置默认样式
        res[0].isDefault = true;
        // 收集默认图片地址为第一张
        skuParams.value.skuDefaultImg = res[0].imgUrl;
    }
    // 将修改后的图片存储
    imageList.value = res
    // 设置table复选框勾选,使用nextTick获取更新后的dom
    nextTick(() => {
        table.value.toggleRowSelection(imageList.value[0], true);
    })
}

// 改变默认照片
const changeDefaultImage = (row:any)=>{
    // 遍历照片数组
    imageList.value.forEach(element => {
        // 默认标记都为false,同时设置复选框都为空
        element.isDefault = false;
        table.value.toggleRowSelection(element, false);
    });
    // 当前行选中
    row.isDefault = true;
    table.value.toggleRowSelection(row, true);
    // 收集当前选中的图片地址
    skuParams.value.skuDefaultImg = row.imgUrl;
}

// 处理销售属性和平台属性数据
const handleSaleAndPlatData = () =>{
    // 处理平台属性
    // 使用reduce方法模拟for循环
    // 设置起始值为一个空数组为初始值,往空数组追加元素,遍历完数组后,返回最有一次执行的结果。
    skuParams.value.skuAttrValueList = platAttrValueList.value.reduce((prev:any,next:Attr)=>{
        // 如果元素对象中存在某一个属性,把这个属性的属性值,取出来
        if(next.attrNameIdAndValueIdTmp){
            // 从数组中解构出属性id和属性值id
            const [attrId,valueId] = next.attrNameIdAndValueIdTmp.split(":")
            // 定义一个对象
            const attrIdAndValueIdObj = {
                attrId,
                valueId
            }
            // 向空数组中push追加元素
            prev?.push(attrIdAndValueIdObj)
            // 返回数组
            return prev
        }
    },[])
    // 处理销售属性
    skuParams.value.skuSaleAttrValueList = saleAttrValueList.value.reduce((prev:any,next:SaleAttrObj)=>{
        if(next.saleNameIdAndValueIdTmp){
            // 从数组中解构出属性id和属性值id
            const [saleAttrId,saleAttrValueId] = next.saleNameIdAndValueIdTmp.split(":")
            // 定义一个对象
            const attrIdAndValueIdObj = {
                saleAttrId,
                saleAttrValueId
            }
            // 向空数组中push追加元素
            prev?.push(attrIdAndValueIdObj)
            // 返回数组
            return prev
        }
    },[])
}

// 清空数据
const reset =()=>{
    Object.assign(skuParams.value, {
        category3Id: "", //三级分类的ID
        spuId: "", //SPU的ID
        tmId: "", //SPU归属于哪一个品牌
        //v-model
        skuName: "", //SKU名字
        price: "", //SKU价格
        weight: "", //SKU重量
        skuDesc: "", //SKU商品的描述
        skuDefaultImg: "", //默认图片的地址
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
    })
}

// 获取事件对象
const $emits = defineEmits(["changeSceneForSku"])

// 暴露数据
defineExpose({
    initDataForAddSku
})

</script>

<script lang='ts'>
export default {
    name: "skuForm"
}
</script>

<style scoped lang="less"></style>