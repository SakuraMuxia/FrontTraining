<template>
    <el-card>
        <el-form inline>
            <el-form-item>
                <el-input  placeholder="用户名" v-model="paramsState.username"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="getUsers()">查询</el-button>
                <el-button type="default" @click="resetInp">清空</el-button>
            </el-form-item>    
        </el-form>

        <div style="margin-bottom: 10px;">
            <el-button type="primary" @click="showAddUser">添 加</el-button>
            <el-button type="danger" @click="removeUsersBat" :disabled="tableState.selectedIds.length===0">批量删除</el-button>
        </div>

        <el-table border stripe :data="tableState.users" v-loading="listLoading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="username" label="用户名" width="150" />
            <el-table-column prop="nickName" label="用户昵称" />
            <el-table-column prop="roleName" label="角色列表" width="200" />
            <el-table-column prop="gmtCreate" label="创建时间" width="180" />
            <el-table-column prop="gmtModified" label="更新时间" width="180" />
            <el-table-column label="操作" width="200" align="center" fixed="right">
                <template v-slot="{row}">
                    <el-button type="info" size="small" :icon="UserFilled" title="分配角色" @click="showAssignRole(row)"/>
                    <el-button type="primary" size="small" :icon="Edit" title="修改用户" @click="showEditUser(row)" />
                    <el-popconfirm  :title="`确定删除 ${row.username} 吗?`" @confirm="removeUser(row.id)">
                        <template #reference>
                            <el-button style="margin-left:10px" type="danger" size="small" :icon="Delete" title="删除用户" />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        
        <el-pagination
            v-model:current-page="paramsState.page"
            v-model:page-size="paramsState.limit"
            :page-sizes="[3, 5, 7]"
            style="margin-top: 10px;"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="tableState.total"
            @current-change="getUsers" 
            @size-change="SizeChange"
        />
        <!-- 添加用户 -->
        <el-dialog v-model="userState.dialogUserVisible"
            :title="userState.user?.id ? '修改用户' : '添加用户'">
            <el-form ref="userFormRef" 
                label-width="120px" 
                :model="userState.user" 
                :rules="userRules">
                <el-form-item label="用户名" prop="username">
                    <el-input  v-model="userState.user.username"/>
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input  v-model="userState.user.nickName"/>
                </el-form-item>
                <el-form-item  label="用户密码" v-if="!userState.user.id" prop="password">
                    <el-input  v-model="userState.user.password"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelUser">取 消</el-button>
                    <el-button :loading="userState.userLoading" @click="addOrUpdate" type="primary" >确 定</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 设置角色 -->
        <el-dialog title="设置角色" v-model="roleState.dialogRoleVisible" :before-close="resetRoleData">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input disabled :value="userState.user.username"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox 
                        :indeterminate="roleState.isIndeterminate" 
                        @change="handleCheckAllChange"
                        v-model="roleState.checkAll">全选</el-checkbox>
                        <div style="margin:15px 0;"></div>
                        <el-checkbox-group v-model="roleState.userRoleIds" @change="handleCheckedChange">
                            <el-checkbox v-for="role in roleState.allRoles" :key="role.id" :label="role.id" :value="role.id" >{{role.roleName}}</el-checkbox>
                        </el-checkbox-group>
                </el-form-item>
            </el-form>

            <template #footer>
                <el-button :loading="roleState.roleLoading" type="primary" @click="assignRole">保存</el-button>
                <el-button @click="resetRoleData">取消</el-button>
            </template>
        </el-dialog>
    </el-card>
</template>

<script setup lang='ts'>
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import { Search, Edit, UserFilled, Delete } from '@element-plus/icons-vue'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { assignUserRoleListApi, getUserListApi, getUserRoleListApi, removeUserApi, removeUsersApi, saveOrUpdateUserApi } from '@/api/acl/user';
import type { UserArr, UserObj } from '@/api/acl/type/user';
import type { AllRolesArr } from '@/api/acl/type/role';
const userFormRef = ref()
const listLoading = ref(false) // 是否显示列表加载的提示
// 定义请求体数据
const paramsState = reactive({
    username: '',
    page: 1, // 当前页码
    limit: 5 // 每页数量
})

// TableState类型
interface TableState {
    total: number
    users: UserArr
    selectedIds: string[]
}
// TableState数据
const tableState = reactive<TableState>({
    total: 0,
    users: [],
    selectedIds: []
})
// 用户表单类型
interface UserState {
  dialogUserVisible: boolean
  userLoading: boolean
  user: UserObj
}
const userState = reactive<UserState>({
    dialogUserVisible: false,
    userLoading: false,
    user: {
        username: '',
        nickName: '',
        password: ''
    }
})
// 用户校验规则
const validatePassword = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback('密码必须输入')
    } else if (!value || value.length < 6) {
        callback('密码不能小于6位')
    } else {
        callback()
    }
}
const userRules = {
    username: [
        { required: true, message: '用户名必须输入' },
        { min: 4, message: '用户名不能小于4位' }
    ],
    password: [{ required: true, validator: validatePassword }]
}

interface RoleState {
    dialogRoleVisible?: boolean
    roleLoading: boolean
    checkAll: boolean
    isIndeterminate: boolean
    userRoleIds: string[]
    allRoles: AllRolesArr
}
const roleState = reactive<RoleState>({
    dialogRoleVisible: false,
    roleLoading: false,
    checkAll: false,
    isIndeterminate: false,
    userRoleIds: [],
    allRoles: []
})

// 生命周期
onMounted(() => {
    // 调用获取用户方法
    getUsers()
})

// 定义搜索的方法
const getUsers = async (page = paramsState.page, limit = paramsState.limit) => {
    // 修改分页数据
    paramsState.page = page
    paramsState.limit = limit
    // 设置loading状态
    listLoading.value = true
    // 发送请求
    const result = await getUserListApi(page, limit, {
        username: paramsState.username
    })
    // loading为false
    listLoading.value = false
    // 设置表格数据
    const { items, total } = result
    tableState.users = items
    tableState.total = total
    tableState.selectedIds = []
}

// 分页变化
const SizeChange = (val:number)=>{
    paramsState.limit = val;
    getUsers();
}

// 清空搜索input
const resetInp = ()=>{
    paramsState.username = ''
    getUsers()
}

// 添加用户
const showAddUser = ()=>{
    // 初始化数据
    resetUserList()
    // 显示对话框
    userState.dialogUserVisible = true
    // 清除校验规则结果
    nextTick(() => userFormRef.value?.clearValidate())
}

// 编辑用户
const showEditUser = (row:UserObj) =>{
    // 获取行对象中的数据并赋值
    userState.user = { ...row }
    // 显示对话框
    userState.dialogUserVisible = true
}

// 提交按钮
const addOrUpdate = async ()=>{
    // 进行表单校验
    await userFormRef.value?.validate()
    const { user } = userState
    if (user.username === 'admin') {
        ElMessage({
            type: "error",
            message: "admin账号不能添加或更新",
        })
        return
    }
    // 加载
    userState.userLoading = true
    try {
        // 发送请求
        await saveOrUpdateUserApi(user)
        // 加载状态取消
        userState.userLoading = false
        // 提示消息
        ElMessage({
            type: "success",
            message: user.id ? "更新成功!":"添加成功!",
        })
        // 更新停留在本页,否则回到第一页
        getUsers(user.id ? paramsState.page : 1)
        // 清空表单内容
        resetUserList()
        // 隐藏对话框
        userState.dialogUserVisible = false
    } catch (error) {
        console.log(error)
        userState.userLoading = false
    }
}
// 取消按钮
const cancelUser = () =>{
    userState.dialogUserVisible = false
    resetUserList()
}
// 清空用户表单数据
const resetUserList = () =>{
    userState.user = {
        username: '',
        nickName: '',
        password: ''
    }
}
// 删除用户(单个)
const removeUser = async (id:string) =>{
    await removeUserApi(id)
    ElMessage({
        type: "success",
        message: "删除成功",
    })
    // 获取用户数据,当用户只剩一个时
    getUsers(
        tableState.users.length === 1 ? paramsState.page - 1 : paramsState.page
    )
}
// 用户复选框勾选
const handleSelectionChange = (selection: any[]) => {
    // 由id作为数组元素的 列表
    tableState.selectedIds = selection.map((item) => item.id)
}

// 批量删除()
const removeUsersBat = ()=>{
    ElMessageBox.confirm('确定删除吗?').then( async () => {
        await removeUsersApi(tableState.selectedIds)
        ElMessage.success('用户删除成功!')
        getUsers()
    }).catch(() => {
        ElMessage.info('取消删除')
    })
}

// 获取角色列表
const getRoles = async() =>{
    // 从当前用户重解构数据id 发请求
    const result = await getUserRoleListApi(userState.user?.id as string)
    // 解构
    const { allRolesList, assignRoles } = result
    // 修改数据
    roleState.allRoles = allRolesList
    roleState.userRoleIds = assignRoles.map((item) => item.id as string)
    // 设置全选和 未全选标记
    roleState.checkAll = allRolesList.length === assignRoles.length
    roleState.isIndeterminate =
    assignRoles.length > 0 && assignRoles.length < allRolesList.length
}

// 展示分配角色
const showAssignRole =(row:UserObj) => {
    // 存储当前选中用户
    userState.user = row
    // 显示角色对话框
    roleState.dialogRoleVisible = true
    // 获取角色
    getRoles()
}

// 关闭前钩子
const resetRoleData = () =>{
    // 重置
    Object.assign(roleState, {
        dialogRoleVisible: false,
        allRoles: [],
        userRoleIds: [],
        isIndeterminate: false,
        checkAll: false
    })
}

// 全选钩子函数
const handleCheckAllChange = (value: string | number | boolean)=>{
    // value 当前勾选状态true/false
    // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
    if(value){
        roleState.userRoleIds = roleState.allRoles.map((item) => item.id as string)
    }else{
        roleState.userRoleIds = []
    } 
    // 不确定状态 设为false 
    roleState.isIndeterminate = false
}

// 改变勾选钩子
const handleCheckedChange =()=>{
    // 解构用户角色ids
    const { userRoleIds, allRoles } = roleState
    // 设置全选标记
    roleState.checkAll =
    userRoleIds.length === allRoles.length && allRoles.length > 0
    // 设置不确定标记
    roleState.isIndeterminate =
    userRoleIds.length > 0 && userRoleIds.length < allRoles.length
}
// 提交角色分配
const assignRole = async () =>{
    // 从当前用户中解构出用户id
    const userId = userState.user?.id
    // 在用户 角色数组中,将数组转为字符串
    const roleIds = roleState.userRoleIds.join(',')
    // 加载
    roleState.roleLoading = true
    // 发请求
    await assignUserRoleListApi(userId as string, roleIds)
    // 加载完成
    roleState.roleLoading = false
    // 提示
    ElMessage({
        type: "success",
        message: "角色分配成功",
    })
    // 清空数据返回
    resetRoleData()
}
</script>

<script lang="ts">
export default {
    name: 'User'
}
</script>

<style scoped lang="less">
</style>