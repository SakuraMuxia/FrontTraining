<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称" v-model="spuParamsObj.spuName" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParamsObj.tmId" style="width: 320px">
				<el-option
					v-for="(trademark, index) in tradeMarkList"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParamsObj.description" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload 
				:on-preview="handleImagePreview"
				list-type="picture-card"
				action="/app-dev/admin/product/fileUpload"
				v-model:file-list="imageListForEle">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px" v-model="dialogVisible">
				<img alt="Preview Image" style="width: 250px; height: 250px" :src="dialogImageUrl"/>
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select v-model="SaleAttrNameNoHasSelectStr" style="width: 240px">
				<el-option
					v-for="(item, index) in SaleAttrNameNoHasList"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`">
				</el-option>
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px" 
				@click="addSaleAttr"
				:disabled="SaleAttrNameNoHasSelectStr ? false : true">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border :data="SaleAttrList">
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" 
							v-for="(item, index) in row.spuSaleAttrValueList"
							:key="item.id"
							@close="row.spuSaleAttrValueList.splice(index, 1)"
							closable>
							{{item.saleAttrValueName}}
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值"
							v-model="row.saleAttrValueNameInp"
							v-if="row.showInput"
							@blur="toLook(row)"
							ref="inputRef"
							size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" 
							v-else
							@click="toEdit(row)"
							size="small">
						</el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" 
							@click="SaleAttrList.splice($index, 1)"
							:icon="Delete">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default" @click="save">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed,nextTick } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SaleAttrObj, SaleAttrValueObj, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAddOrUpdateSpu, reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import type { UploadProps, UploadUserFile } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { ElMessage } from "element-plus";
// 获取input标签元素
const inputRef = ref<any>()

// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: [],
	spuSaleAttrList: []
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据
const imageList = ref<ImageArr>([])
// 照片墙数据 (用于element渲染)
const imageListForEle = ref<any>([])
// 控制照片对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 预览照片的地址
const dialogImageUrl = ref<string>("");

// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);


// 销售属性属性名数组
const SaleAttrNameList = ref<SaleAttrNameArr>([])
// 销售属性属性名字符串(目前销售属性未拥有但是现在选中)
const SaleAttrNameNoHasSelectStr = ref<string>("")
// 销售属性属性名数组(目前销售属性未拥有的数组) 计算属性 
const SaleAttrNameNoHasList = computed(() => {
	const result = SaleAttrNameList.value.filter((item) => {
		return SaleAttrList.value.every((obj) => {
			return item.name != obj.saleAttrName;
		})
	})
	return result
});


// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 编辑SPU函数 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整),然后再发其他请求获取全部数据
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
	// element渲染的照片做专门处理
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

// 提交按钮
const save = async () =>{
	// 处理照片墙
	handleImageUpload()
	// 处理销售属性
	handleSaleAttr()
	// 发送请求
	await reqAddOrUpdateSpu(spuParamsObj).then(()=>{
		//提示消息
		ElMessage({
			type: "success",
			message: spuParamsObj.id ? "更新成功" : "添加成功",
    	});
		// 切换场景为 spu table展示数据
		$emits("changeScene",0)
	}).catch((err)=>{
		console.log(err)
	})
}

// 显示照片的显示放大
const handleImagePreview =(uploadFile:any)=>{
	// 对话框显示出来
	dialogVisible.value = true;
	// 设置预览照片地址
	dialogImageUrl.value = uploadFile.url as string;
}

// 处理销售属性
const handleSaleAttr = () =>{
	// 把销售属性 合并到 spuParamsObj中
	spuParamsObj.spuSaleAttrList = SaleAttrList.value
}

// 处理照片墙的上传和合并到请求体
const handleImageUpload = () =>{

	// 遍历imageListForEle,并把imageListForEle中对象的url地址更改,最后赋值给imageList
	imageList.value = imageListForEle.value?.map((item:any)=>{
		return {
			imgName:item.name,
			imgUrl:(item.response && item.response.data) || item.url
		}
	})
	// 把照片墙数组 imageList 追加到 spuParamsObj 中
	spuParamsObj.spuImageList = imageList.value
}

// 新增销售属性方法
const addSaleAttr = ()=>{
	// 从下拉框选中的字符串中结构出 属性名id和属性名Name
	const [baseSaleAttrId, saleAttrName] = SaleAttrNameNoHasSelectStr.value.split(":")
	// 定义一个 销售属性对象 用来存放新添加的 销售属性
	const SaleAttr = {
		baseSaleAttrId, //新增销售属性的ID
		saleAttrName, //新增的销售属性名字
		spuSaleAttrValueList: [], //存储属性值的数组
	}
	// 把这个销售对象 追加到 销售属性列表中
	SaleAttrList.value.push(SaleAttr as SaleAttrObj)
	// 清空下拉框的双向绑定数据
	SaleAttrNameNoHasSelectStr.value = ""
}

// 销售属性表格内 属性值列表 编辑和查看模式切换
	// 编辑模式
const toEdit = (row:SaleAttrObj)=>{
	// 在row行对象中的添加showInput属性,用于控制当前行对象中的显示和隐藏
	row.showInput = true
	// 清空输入框内容
	row.saleAttrValueNameInp = ""
	// 获取焦点
	// input输入框获取焦点
    nextTick(() => {
        inputRef.value.focus();
    });
}
	// 查看模式
const toLook = (row:SaleAttrObj)=>{
	// 非法情况判断
	// 属性值不能为空
		// 在行对象中添加saleAttrValueNameInp属性,用于存储当前行对象中input输入的内容
	if (row.saleAttrValueNameInp?.trim() == "") {
		ElMessage({
			type: "error",
			message: "属性值不能为空",
		})
		row.showInput = false
		return
	}
	// 属性值不能重复
	const repeat = row.spuSaleAttrValueList?.find((item) => {
		return row.saleAttrValueNameInp === item.saleAttrValueName;
	})
	if (repeat) {
		ElMessage({
			type: "error",
			message: "属性值不能重复",
		})
		return
	}
	// 切换为查看模式
	row.showInput = false
	// 向spuSaleAttrValueList数组中添加数据
		// 定义一个对象
	const SaleAttrValueItem = {
		baseSaleAttrId: row.baseSaleAttrId, //属性值对属于哪个属性名
    	saleAttrValueName: row.saleAttrValueNameInp, //新增的属性值的名字
	}
		// 添加新的属性值
	row.spuSaleAttrValueList?.push(SaleAttrValueItem as SaleAttrValueObj);
}


// 暴漏数据
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