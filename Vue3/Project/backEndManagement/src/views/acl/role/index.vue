<template>
    <el-card>
        <el-form inline>
            <el-form-item>
                <el-input placeholder="角色名称" v-model="roleNames.roleName"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :icon="Search" @click="getRoles()">查询</el-button>
                <el-button @click="resetSearch">清空</el-button>
            </el-form-item>
        </el-form>
        
        <div style="margin-bottom: 10px">
            <el-button type="primary" @click="addRole">添加</el-button>
            <el-button type="danger" @click="removeRoles" :disabled="selectedRoles.length === 0">批量删除</el-button>
        </div>
  
        <el-table border stripe style="width: 960px" v-loading="listLoading" :data="rolesList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column label="角色名称">
                <template v-slot="{row}">
                    <template v-if="row.edit">
                    <el-input v-model="row.roleName" class="edit-input" size="small" @blur="toLook(row)" ref="inputRef" />
                    <el-button class="cancel-btn" size="small" :icon="Refresh" type="warning" @click="cancelEdit(row)">
                        取 消
                    </el-button>
                    </template>
                    <span v-else>{{ row.roleName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template v-slot="{row}">
                    <el-button size="small" type="info" :icon="InfoFilled" title="分配权限"
                        @click="$router.push(`/acl/role/auth?id=${row.id}&roleName=${row.roleName}`)"
                    />
                    <el-button size="small" type="primary" :icon="Check" title="确定" @click="updateRole(row)" />
                    <el-button size="small" type="primary" :icon="Edit" title="修改角色"  @click="EditRule(row)"/>
                    <el-button size="small" type="danger" :icon="Delete" title="删除角色" @click="removeRole(row)"/>
                </template>
            </el-table-column>
        </el-table>
  
        <!-- 分页组件 -->
        <el-pagination
            v-model:current-page="page"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7]"
            style="margin-top: 10px;"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getRoles"
            @size-change="SizeChange"
        />
    </el-card>
</template>
<script lang="ts">
    export default {
        name: 'Role'
    }
</script>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { Search,Edit,Delete,Refresh,InfoFilled,Check} from '@element-plus/icons-vue'
import type { AllRolesArr } from '@/api/acl/type/role';
import { getRoleListApi, removeRoleApi, removeRolesApi, saveRoleApi,updateRoleApi } from '@/api/acl/role';
import { ElMessage, ElMessageBox } from 'element-plus';

const selectedRoles = ref<AllRolesArr>([]) // 所有选中的角色列表
const listLoading = ref(false) // 数据是否正在加载
const rolesList = ref<AllRolesArr>([]) // 角色列表
const total = ref(0) // 总记录数
const page = ref(1) // 当前页码
const limit = ref(5) // 每页记录数
const inputRef = ref() // input输入框对象
const roleNames = reactive({
    // 用户搜索的用户名
    roleName: '',
    searchRoleName: ''
})

// 获取角色分页列表
const getRoles = (p = page.value, size = limit.value) => {
    // 设置页码,每页显示
    page.value = p
    limit.value = size
    // 加载
    listLoading.value = true
    // 发请求
    getRoleListApi(p, size, roleNames.roleName)
    .then((result) => {
        // 存储角色列表数据
        rolesList.value = result.items.map((item) => {
            item.edit = false // 用于标识是否显示编辑输入框的属性
            item.originRoleName = item.roleName // 缓存角色名称, 用于取消
            return item
        })
        // 存储总数
        total.value = result.total
    })
    .finally(() => {
        // 取消加载
        listLoading.value = false
    })
}
// 重置搜索内容
const resetSearch = () => {
    roleNames.roleName = ''
    getRoles()
}
// 分页变化
const SizeChange = (val:number)=>{
    limit.value = val;
    getRoles();
}
// 添加角色
const addRole = () =>{
    // 显示添加界面
    ElMessageBox.prompt('请输入新名称', '添加角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    })
    .then(({ value }) => {
        saveRoleApi({ roleName: value }).then(() => {
            ElMessage.success('添加角色成功')
            getRoles()
        }).catch(()=>{
            ElMessage.success('添加角色失败')
        })
    })
    .catch(() => {
        ElMessage.warning('取消添加')
    })
}
/* 
  删除指定的角色
*/
const removeRole = (role: any) => {
    ElMessageBox.confirm( `确定删除 '${role.roleName}' 吗?`, '提示', {
        type: 'warning'
    })
    .then(async () => {
        // 发送删除角色请求
        await removeRoleApi(role.id as string)
        // 重新获取数据,如果本页只有一个 回到前一页
        getRoles(rolesList.value.length === 1 ? page.value - 1 : page.value)
        ElMessage.success('删除成功!')
    })
    .catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 更新角色
const updateRole = (role: any) => {
    updateRoleApi(role).then(() => {
        ElMessage.success('更新角色成功!')
        getRoles()
    })
}
// 批量删除
const removeRoles = () => {
    ElMessageBox.confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        type: 'warning'
    })
    .then(async () => {
        // 获取id数组
        const ids = selectedRoles.value.map((role) => role.id as string)
        // 发送请求
        await removeRolesApi(ids)
        // 重新获取数据,如果本页只有一个 回到前一页
        getRoles(rolesList.value.length === 1 ? page.value - 1 : page.value)
        // 提示信息
        ElMessage({
            type: 'success',
            message: '批量删除成功!'
        })
    })
    .catch((error) => {
        if (error === 'cancel') {
            ElMessage({
                type: 'info',
                message: '已取消删除'
            })
        }
    })
}
// table勾选变化
const handleSelectionChange = (selection: AllRolesArr) =>{
    selectedRoles.value = selection
}
// 取消编辑
const cancelEdit = (row:any) =>{
    // 取出之前存的
    row.roleName = row.originRoleName as string
    // 编辑标记为false
    row.edit = false
    // 提示
    ElMessage.warning('取消角色修改')
}

// 编辑
const EditRule = (row:any) =>{
    // 设置编辑标记
    row.edit= true
    // 获取光标
    nextTick(() => {
        inputRef.value.focus();
    });
} 

// 确认编辑
const toLook = (row:any) =>{
    row.edit = false
}

onMounted(() => {
    getRoles()
})

</script>
