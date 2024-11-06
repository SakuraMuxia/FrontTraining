<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select>

			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload list-type="picture-card">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px">
				<img alt="Preview Image" style="width: 100%; height: 250px" />
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select>

			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border>
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" closable>
							123
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值" size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" size="small"></el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" :icon="Delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import cloneDeep from 'lodash/cloneDeep'
// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: null,
	spuSaleAttrList: null,
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据
const imageList = ref<ImageArr>([])
const imageListForEle = ref<ImageArr>([])
// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);
// 销售属性属性名
const SaleAttrNameList = ref<SaleAttrNameArr>([])

// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 修改数据 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整)
const initSpuObj = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// 存储照片墙数组
	imageList.value = result1
	// 存储element渲染照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	})
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}

defineExpose({
	initSpuObj,

});

</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>