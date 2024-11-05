<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px">
            <div v-show="scene === 0">
                <!-- 按钮 -->
                <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addAttr">添加属性</el-button>
                <!-- 属性表格 -->
                <transition name="attr">
                    <el-table border style="margin: 10px 0px" :data="attrList" v-show="attrList.length">
                        <el-table-column type="index" align="center" label="序号" width="80px"></el-table-column>
                        <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                        <el-table-column label="属性值">
                            <template #="{ row, $index }">
                                <el-tag
                                    style="margin: 5px"
                                    v-for="(item, index) in row.attrValueList"
                                    :key="item.id"
                                    :type="item.id %2 ==0 ? 'primary':'warning'"
                                    >{{ item.valueName }}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120px">
                            <template #="{ row, $index }">
                                <el-button
                                    type="warning"
                                    size="small"
                                    :icon="Edit"
                                    >
                                </el-button>
                                <el-popconfirm
                                    :title="`你确定要删除${row.attrName}`"
                                    width="250px"
                                    >
                                    <template #reference>
                                        <el-button type="danger" size="small" :icon="Delete"></el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                </transition>
                <!-- 空数据时的组件 -->
                <el-empty description="暂无数据"
                    v-show="!attrList.length"
                    :image="src"
                    :image-size="400"
                />
            </div>
            <!-- 添加属性 -->
            <div v-show="scene === 1">
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input
                            type="text"
                            placeholder="请你输入属性名称"
                            v-model="attrParams.attrName"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" :icon="Plus" @click="addAttrValue" :disabled="attrParams.attrName ? false : true">添加属性值</el-button>
                <el-button @click="scene = 0">取消</el-button>
                <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px"
                    ></el-table-column>
                    <el-table-column label="属性值">
                        <!-- row:即为每一个属性值对象 -->
                        <template #="{ row, $index }">
                            <!-- input标签 -->
                            <el-input
                            ref="inputRef"
                            size="small"
                            v-if="row.showInput"
                            v-model="row.valueName"
                            @blur="toLook(row, $index)"
                            ></el-input>
                            <!-- div标签 -->
                            <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button
                            type="danger"
                            :icon="Delete"
                            size="small"
                            @click="attrParams.attrValueList.splice($index, 1)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button
                    type="primary"
                    @click="save"
                    :disabled="attrParams.attrName && attrParams.attrValueList.length ? false : true"
                    >保存</el-button>
                <el-button @click="scene = 0">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { reqAddOrUpdateAttr, reqAttrList } from "@/api/product/attr";
import type { AttrResponseData,Attr, AttrValue } from "@/api/product/type/attr";
import useCategoryStore from "@/stores/category";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { watch, ref, reactive, nextTick } from "vue";

// 属性列表
const attrList = ref<AttrResponseData>([])

// 添加属性和属性值，请求体
const attrParams = reactive<Attr>({
    categoryId: "", //新增的属性归属于哪一个三级分类
    categoryLevel: "3", //代表几级分类，默认3级
    attrName: "", //属性的名字
    //属性值数组
    attrValueList: [],
})

// 定义分类小仓库(分类组件的)
const categoryStore = useCategoryStore();

// 定义input组件实例
const inputRef = ref<any>();
const url =
  "https://5b0988e595225.cdn.sohucs.com/q_70,c_zoom,w_640/images/20180416/44bd1160128d42658f1ad6aa013aad75.gif";
const src = ref<string>(url);

// 定义场景切换开关
const scene = ref<number>(0);

// 监听
watch(()=>categoryStore.c3Id,()=>{
    //每一次监听到三级分类变化:把已有属性与属性值清空
    attrList.value = [];
    // 使用watch监听 仓库中三级分类id变化 且 仓库中三级分类id不为空 时发送请求
    categoryStore.c3Id && getAttrList();
})

//获取全部已有的属性与属性值方法
const getAttrList = async () => {
    //一级、二级、三级分类的ID
    const { c1Id, c2Id, c3Id } = categoryStore;
    const result: AttrResponseData = await reqAttrList(c1Id, c2Id, c3Id)
    attrList.value = result;
}

// 添加属性
const addAttr = () =>{
    //清空数据
    reset();
    //收集三级分类的ID[也可以点击保存的时候收集]
    attrParams.categoryId = categoryStore.c3Id;
    // 设置场景为添加属性
    scene.value = 1;
}

// 添加属性值
const addAttrValue =()=>{
    //向属性值数组添加属性对象
    //在每一个属性值对象身上放置编辑与查看模式标记
    attrParams.attrValueList.push({
        valueName: "",
        showInput: true,
    })
    //当响应式数据发生变化后,立即调用nextTick方法,获取更新后的DOM|组件实例
    nextTick(() => {
        inputRef.value.focus();
    });
}

// 提交
const save = async() =>{
    try {
        await reqAddOrUpdateAttr(attrParams)
        //消息提示
        ElMessage({
            type: "success",
            message: attrParams.id ? "更新成功" : "添加成功",
        });
        //切换场景为0
        scene.value = 0;
        //添加或者更新成功以后再次获取全部已有的属性
        getAttrList();
    } catch (error) {
        //消息提示
        ElMessage({
            type: "error",
            message: attrParams.id ? "更新失败" : "添加失败",
        });
    }
    
}

// 用户取消、保存成功以后要清空数据的方法
const reset = () => {
  //ES6的语法:Object.assign
  Object.assign(attrParams, {
    categoryId: "", //新增的属性归属于哪一个三级分类
    categoryLevel: "3", //代表几级分类
    attrName: "", //属性的名字
    //属性值数组
    attrValueList: [],
    // 更新时
    id: "",
  });
};

// input失去焦点
const toLook = (row:AttrValue,index:number) => {

    //属性值不能为空
    if (row.valueName.trim() == "") {
        ElMessage({
            type: "error",
            message: "属性值不能为空",
        });
        //从数组中删除当前元素
        attrParams.attrValueList.splice(index, 1);
        //属性值为空，后面的语句不在执行,div不出现
        return;
    }

    //判断属性值不能重复
    const repeat = attrParams.attrValueList.find((item) => {
        //把除自己以外的元素都返回
        if (row != item) {
        return row.valueName.trim() === item.valueName.trim();
        }
    })
    if (repeat) {
        ElMessage({
        type: "error",
        message: "属性值不能重复",
        });
        //从数组中删除当前元素
        attrParams.attrValueList.splice(index, 1);
        return;
    }

    //显示div
    row.showInput = false
}

//div点击事件
const toEdit = (row: AttrValue) => {
    //点击div 变为 input
    row.showInput = true;
    // input输入框获取焦点
    nextTick(() => {
        inputRef.value.focus();
    });
};

//删除已有的属性
const deleteAttr = async (id: number) => {
    try {
        //删除已有属性成功
        await reqDeleteAttr(id);
        //消息提示
        ElMessage({
            type:'success',
            message:'删除成功'
        });
        //再次获取最新剩下全部属性
        getAttrList();
    } catch (error) {

    }
}



</script>

<style scoped lang="less">
</style>

<style scope>

.attr-enter-active,.attr-leave-active{
    transition: all 1.5s;
}
.attr-leave-to,.attr-enter{
    opacity: 0;
}

</style>