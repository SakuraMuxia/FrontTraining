<template>
    <el-card>
        <el-input disabled :value="$route.query.roleName"></el-input>
        <el-tree
            style="margin: 20px 0"
            ref="treeRef"
            :data="allPermissions"
            node-key="id"
            show-checkbox
            default-expand-all
            :props="defaultProps"
            v-loading="listLoading"
        />
        <el-button :loading="loading" type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
    </el-card>
  </template>

<script lang="ts">
export default {
    name: 'roleAuth'
}
</script>

<script lang="ts" setup>

import { useRouter, useRoute } from 'vue-router'
import {ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'

import { getAssignRoleApi, assignRoleApi } from '@/api/acl/role'
import { useUserInfoStore } from '@/stores/userInfo'
// 用户数据仓库
const userInfoStore = useUserInfoStore()
// 路由器对象
const router = useRouter()
// 路由配置对象
const route = useRoute()
// 加载标记
const loading = ref(false) 
// 完整的权限
const allPermissions = ref<PermissionListModel>([])
// 树形结构对象
const treeRef = ref<InstanceType<typeof ElTree>>()
// 设置属性结构别名   
const defaultProps = {
  children: 'children',
  label: 'name'
}
// 设置loading状态
const listLoading = ref<boolean>(false)
// 设置勾选数组状态
const checkedIds = ref<any>()

onMounted(() => init())

/* 
  初始化
*/
const init = () => {
    // 获取路由地址中的id
    const roleId = route.query.id
    listLoading.value = true
    // 调用获取权限的方法
    getPermissions(roleId as string)
    listLoading.value = false
}

/* 
  获取指定角色的权限列表
*/
const getPermissions = (roleId: string) => {
    // 发送请求
    getAssignRoleApi(roleId).then((result) => {
        // 存储服务器数据
        allPermissions.value = result.children as PermissionListModel
        // 存储勾选数组
        checkedIds.value = getCheckedIds(allPermissions.value)
        // console.log('getPermissions() checkedIds', checkedIds)
        // 设置勾选状态
        treeRef.value?.setCheckedKeys(checkedIds.value)
    })
}

/* 
  得到所有选中的id列表
  只用得到所有选中的按钮权限数据的id
*/
const getCheckedIds = (auths: PermissionListModel, initArr: string[] = []) => {
    // 遍历权限列表数组
    auths.forEach((item) => {
        // 判断如果元素存在 select标记 并且 等级是4
        if (item.select && item.level === 4) {
            // 在新数组中添加元素
            initArr.push(item.id as string)
        } else if (item.children) { // 如果存在孩子
            // 递归调用
            getCheckedIds(item.children, initArr)
        }
    })
    // 返回新数组
    return initArr
}

/* 
  保存权限列表
*/
const save = () => {
    // 得到所有全选的id
    const checkedIds = treeRef.value?.getCheckedKeys()
    // console.log("选中状态的数据",checkedIds)
    // 得到所有半选的id
    const halfCheckedIds = treeRef.value?.getHalfCheckedKeys()
    // console.log("半选状态的数据",halfCheckedIds)
    // 合并全选和半选的id， 并用逗号连接成串
    var ids = checkedIds?.concat(halfCheckedIds as []).join(',')

    loading.value = true
    // 发送请求
    assignRoleApi(route.query.id as string, ids as string).then(async () => {
        loading.value = false
        ElMessage.success('分配权限成功')
        // 跳转到角色列表页面
        await router.replace('/acl/role/list')
        // 跳转完成后, 如果分配的是当前用户角色的权限, 刷新一下浏览器
        const roleName = route.query.roleName
        // if (userInfoStore.roles.includes(roleName as string)) {
        //   window.location.reload()
        // }
    })
}

/* 
  取消
  */
const cancel = () => {
  // 跳转到角色列表
  router.replace('/acl/role/list')
}
</script>