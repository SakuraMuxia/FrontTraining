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
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" :icon="Plus">添加属性值</el-button>
                <el-button @click="scene = 0">取消</el-button>
                <el-table border style="margin: 10px 0px" >

                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px"
                    ></el-table-column>

                    <el-table-column label="属性值">
                        <!-- row:即为每一个属性值对象 -->
                        <template #="{ row, $index }">
                            <el-input
                            ref="inputRef"
                            size="small"
                            ></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button
                            type="danger"
                            :icon="Delete"
                            size="small"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button
                    type="primary"
                    >保存</el-button>
                <el-button @click="scene = 0">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { reqAttrList } from "@/api/product/attr";
import type { AttrResponseData } from "@/api/product/type/attr";
import useCategoryStore from "@/stores/category";
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { watch, ref, reactive, nextTick } from "vue";

// 属性列表
const attrList = ref<AttrResponseData>([])

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

// 方法
//获取全部已有的属性与属性值方法
const getAttrList = async () => {
    //一级、二级、三级分类的ID
    const { c1Id, c2Id, c3Id } = categoryStore;
    const result: AttrResponseData = await reqAttrList(c1Id, c2Id, c3Id)
    attrList.value = result;
}

const addAttr = () =>{
    // 设置场景为添加属性
    scene.value = 1;
}

// //用户取消、保存成功以后要清空数据的方法


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