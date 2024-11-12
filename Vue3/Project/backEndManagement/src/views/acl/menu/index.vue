<template>
    <el-card>
        <!-- 表格 -->
        <el-table border style="margin-bottom: 20px;" :data="menuPermissionList" :expand-row-keys="expandKeys" row-key="id" v-loading="listLoading">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="权限值" />
            <el-table-column prop="toCode" label="跳转权限值" />
            <el-table-column label="操作">
                <template v-slot="{row}">
                    <el-button :disabled="row.level===4" type="primary" :icon="Plus" size="small" @click="toAddPermission(row)" :title="getAddTitle(row.level)" />
                    <el-button type="primary" :icon="Edit" size="small" :disabled="row.level===1" @click="toUpdatePermission(row)" :title="row.level===4 ? '修改功能' : '修改菜单'" />
                    <el-button :disabled="row.level===1" type="danger" :icon="Delete" size="small" @click="removePermission(row)" title="删除" />
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" @close="resetData">
            <el-form ref="permissionRef" :model="permission" :rules="permissionRules" label-width="120px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="permission.name" />
                </el-form-item>
                <el-form-item label="功能权限值" prop="code">
                    <el-input v-model="permission.code" />
                </el-form-item>
                <el-form-item label="跳转路由权限值" prop="toCode" v-if="permission.level===4">
                    <el-input v-model="permission.toCode" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="resetData">取 消</el-button>
                <el-button type="primary" @click="addOrUpdatePermission">确 定</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script setup lang='ts'>
import { ElMessage, ElMessageBox } from "element-plus";
import {Plus, Edit, Delete} from '@element-plus/icons-vue'
import { reactive, ref, computed, onMounted, nextTick } from "vue";
import type { PermissionListModel, PermissionModel, PermissionLevelModel } from "@/api/acl/type/permission";
import { getPermissionListApi, removePermissionApi, saveOrUpdatePermissionApi } from "@/api/acl/permission";
import cloneDeep from 'lodash/cloneDeep'
// 权限设置表单对象
const permissionRef = ref<FormInstance>()
// 菜单权限列表
const menuPermissionList = ref<PermissionListModel>([])
// 展开的值
const expandKeys = ref<string[]>([])
// 对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 权限对象 默认值
const permission = reactive<PermissionModel>({ // 要操作的菜单权限对象
    type: 1,
    level: 0, // 菜单级别
    name: '', // 菜单名字
    code: '', // 菜单按钮
    toCode: '' // 菜单
})
// 加载状态
const listLoading = ref<boolean>(false)

onMounted(() => {
    fetchPermissionList()
})

/* 
  动态计算得到Dialog的标题
*/
const dialogTitle = computed(() => {
    const {id, level} = permission
    if (id) {
        return level===4 ? '修改功能' : '修改菜单'
    } else {
        return level===4 ? '添加功能' : '添加菜单'
    }
})

/* 
    根据权限的等级来计算确定校验规则
*/
const permissionRules = computed(() => {
    // 菜单权限校验的规则
    const menuRules = { 
        name: [{required: true, message: '名称必须输入'}],
        code: [{required: true, message: '权限值必须输入'}],
    }
    // 按钮功能权限校验的规则
    const btnRules = { 
        name: [{required: true, message: '名称必须输入'}],
        code: [{required: true, trigger: 'blur', message: '功能权限值必须输入'}]
    }
    return permission.level===4 ? btnRules : menuRules
})

/* 
    根据级别得到要显示的添加dialog的标题
*/
const getAddTitle = (level: number) => {
    if (level===1 || level===2) {
        return '添加菜单'
    } else if (level===3){
        return '添加功能'
    }
}

/* 
请求获取权限菜单数据列表
*/
const fetchPermissionList = async () => {
    // 设置状态
    listLoading.value = true
    // 发送请求
    const result = await getPermissionListApi()
    // 存储数据
    menuPermissionList.value = result.children
    listLoading.value = false
    // 默认展开行 展开第一行
    expandKeys.value = [menuPermissionList.value[0].id as string]
}

/* 
    显示添加权限的界面(菜单或功能)
*/
const toAddPermission = (row: PermissionModel) => {
    // 打开添加对话框
    dialogVisible.value = true
    permission.id = ''
    // 设置pid为当前行对象id
    permission.pid = row.id    // pid ==> parentId 父权限数据的id
    // 设置权限对象 等级为 顺等加1
    permission.level = (row.level + 1) as PermissionLevelModel
    // 设置权限类型
    permission.type = permission.level===4 ? 2 : 1
    
    // 清除校验(必须在界面更新之后)
    // 注意: 校验规则是动态的, nextTick清除后还会显示错误信息, 应该是在nextTick后又进行了校验
    // nextTick(() => {
    //     permissionRef.value?.clearValidate()
    // })
    setTimeout(() => {
        permissionRef.value?.clearValidate()
    }, 0);
}

/* 
    显示菜单添加或更新的dialog
*/
const toUpdatePermission = (row: PermissionModel) => {
    // 设置对话框显示
    dialogVisible.value = true
    // 把行对象内容显示
    Object.assign(permission, row)
    // 设置permission的类型
    permission.type = permission.level===4 ? 2 : 1

    // 清除校验(必须在界面更新之后)
    // nextTick(() => permissionRef.value?.clearValidate())
    // 注意: 校验规则是动态的, nextTick清除后还会显示错误信息, 应该是在nextTick后又进行了校验
    setTimeout(() => {
        permissionRef.value?.clearValidate()
    }, 0);
}

/* 
  删除某个权限节点
*/ 
const removePermission = (permission: PermissionModel) => {
    
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        type: 'warning'
    }).then(async () => {
        // 发送删除请求
        await removePermissionApi(permission.id as string)
        ElMessage.success('删除成功!')
        // 重新获取数据
        fetchPermissionList()
    }).catch((error) => {
        // 提示错误
        if (error==='cancel') {
            ElMessage({
            type: 'info',
            message: '已取消删除'
            })
        }
    })
}

/* 
  添加或更新功能权限
*/
const addOrUpdatePermission = () => {
    // 校验表单数据
    permissionRef.value?.validate(async valid => { // 校验的回调函数
        if (valid) {
            // 解构出id
            const { id } = permission
            // console.log("valid",valid); // 通过校验返回 true
            // 发送请求
            await saveOrUpdatePermissionApi(permission)
            // 提示信息
            ElMessage.success(`${id ? '修改' : '添加'}成功!`)
            // 重置数据
            resetData()
            // 重新获取请求
            fetchPermissionList()
        }
    })
}

/* 
  重置数据
*/
const resetData = () => {
    // 关闭对话框
    dialogVisible.value = false
    // 合并属性
    Object.assign(permission,cloneDeep({
        id:null,
        type: 1,
        level: 0,
        name: '',
        code: '',
        toCode: ''
    }))
}
</script>
<script lang="ts">
    export default {
        name: 'Permission'
    }
</script>
<style scoped lang="less">
</style>