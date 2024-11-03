<template>
    <el-card shadow="hover">
        <!-- 顶部按钮 -->
        <el-button type="primary" :icon="Plus" @click="handleAddDialog">添加品牌</el-button>
        <el-button type="primary" :icon="Download" @click="downLoad">导出数据</el-button>
        <!-- 表格 -->
        <el-table :data="tradeMarkList" style="width: 100%;margin:10px 0px" border>
            <el-table-column label="序号" width="90" align="center" type="index"/>
            <el-table-column label="品牌名称" prop="tmName"/>
            <el-table-column label="品牌LOGO" prop="logoUrl">
                <template #="{row,$index}">
                    <img :src="row.logoUrl" alt="" style="width: 100px;height:100px">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="scope">
                    <el-button type="warning" size="small" :icon="Edit" @click="updateTradeMark(scope.row)" circle />
                    <el-popconfirm
                        :title="`你确定要删除${scope.row.tmName}?`"
                        icon-color="red"
                        :icon="Delete"
                        width="250px"
                        @confirm="deleteTradeMark(scope.row.id)"
                    >
                        <template #reference>
                            <el-button type="danger" size="small" :icon="Delete" circle />
                        </template>
                    </el-popconfirm>
                    
                </template>
            </el-table-column>
        </el-table>
        <!-- 对话框 -->
        <el-dialog 
            v-model="showDialog" 
            title="新增品牌" >
            <el-form 
                ref="formRef"
                :model="tradeMark"
                label-width="100px"
                style="width: 80%"
                :rules="rules"
                >
                <el-form-item label="品牌名称" prop="tmName">
                    <el-input type="text" placeholder="请输入品牌名称" v-model="tradeMark.tmName"/>
                </el-form-item>
                <el-form-item label="品牌LOGO" prop="logoUrl">
                    <!-- action:上传图片的请求地址 上传图片post 需要代理跨域 app-dev  -->
                    <el-upload
                        class="avatar-uploader"
                        action="/app-dev/admin/product/fileUpload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="tradeMark.logoUrl" :src="tradeMark.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <!-- 具名插槽:放置确定与取消按钮 -->
                <el-button size="default" @click="handleCloseDialog">取消</el-button>
                <el-button type="primary" size="default" @click="confirm" >确定</el-button>
            </template>
        </el-dialog>
        <!-- 分页 layout中的->:把右侧的放在最右侧 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7]"
            :size="size"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
</template>

<script setup lang='ts'>
import { Plus,Download,Edit,Delete } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { reqAddOrUpdateTradeMark, reqDeleteById, reqTradeMark } from '@/api/product/trademark'
import type {TradeMarkResponseData,Records, TradeMark} from '@/api/product/type/trademark'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

// 表格相关
const tradeMarkList = ref<Records>([])
// 分页相关
const pageNo = ref<number>(1)
const pageSize = ref(3)
const size = ref<ComponentSize>('default')
const total = ref<number>(0)
// 表单相关
const showDialog = ref<boolean>(false)
const formRef = ref()
let tradeMark = reactive<TradeMark>({
    tmName: "", //收集新增品牌名称
    logoUrl: "", //收集新增品牌图片地址
})

// 自定义校验规则
const validatorTmName = (rule: any, value: any, callBack: any) =>{
    //规则对象没有实际用途 rule
    //表单内容  value
    //放行函数 callBack
    // /^[\u4e00-\u9fa5]{2,}$/.test(value)
    if (value) { // 如果前两位数是汉字
        callBack();
    } else {
        //不符合条件
        callBack(new Error("品牌名称至少两位汉字"));
    }
}
const validatorLogoUrl = (rule: any, value: any, callBack:any)=>{
    //value即为上传图片地址:如果有放行
    if (value) {
        callBack();
    } else {
        //value即为上传图片地址:如果没有返回错误信息
        callBack(new Error("请上传图片LOGO"));
    }
}
// 设置校验规则
const rules = {
    tmName:[{
        required:true,
        trigger:"blur",
        validator:validatorTmName
    }],
    logoUrl:[{
        required:true,
        validator:validatorLogoUrl
    }]
}
//清空表单校验的结果
const resetFiledResult = () => {
    formRef.value?.clearValidate("tmName")
    formRef.value?.clearValidate("logoUrl")
}
// 重置表单数据
const resetFromData = ()=>{
    tradeMark.id = 0
    tradeMark.tmName = ""
    tradeMark.logoUrl = ""
}
// 上传相关
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
    //response:即为上传图片post 请求返回的数据
    //file:即为上传图片对象
    tradeMark.logoUrl = response.data;
    //图片上传成功清除校验结果
    formRef.value.clearValidate("logoUrl");

}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == "image/png" || rawFile.type == "image/gif" || rawFile.type == "image/jpeg") {
        if (rawFile.size / 1024 / 1024 < 1) {
            // 放行
            return true;
        }else{
            ElMessage({
                type: "error",
                message: "上传大小不能超出2M",
            });
            return false;
        }
    } else{
        //上传失败的提示
        ElMessage({
            type: "error",
            message: "上传文件格式不正确",
        });
        //不上传
        return false;
    }
}

// 生命周期
onMounted(()=>{
    getTradeMarkList()
})

// 获取品牌列表数据方法
const getTradeMarkList = async(val:number=1) =>{
    pageNo.value = val
    const result:TradeMarkResponseData = await reqTradeMark(pageNo.value,pageSize.value)
    // 修改品牌列表数据
    tradeMarkList.value = result.records
    total.value = result.total
}

// 添加品牌
const handleAddDialog = () =>{
    // 清空表单数据
    resetFromData()
    // 显示模态框
    showDialog.value = true
    //清空表单校验的结果
    resetFiledResult();

}
// 编辑品牌
const updateTradeMark = (row:TradeMark) =>{
    //将已有的品牌数据赋值给tradeMark
    tradeMark.id = row.id;
    tradeMark.tmName = row.tmName;
    tradeMark.logoUrl = row.logoUrl;
    //显示对话框
    showDialog.value = true;
}
// 删除品牌
const deleteTradeMark = async (id:number) =>{
    try {
        await reqDeleteById(id);
        //提示
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        //再次获取全部已有品牌数据(当前页)
        getTradeMarkList(pageNo.value);
    } catch (error) {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
}
const confirm = async()=>{
    //收集参数
    // 校验数据 调用 formRef对象的 validate() 方法
    //通过form组件实例的validate方法进行全部的表单校验
    //validate方法执行:会返回一个Promise->成功(全部表单相校验成功)、失败(只要有一个表单相校验失败)
    await formRef.value.validate();
    //发请求
    try {
        //添加品牌成功||修改品牌成功
        await reqAddOrUpdateTradeMark(tradeMark);
        //关闭对话框
        showDialog.value = false
        //提示
        ElMessage({
        type: "success",
        message: tradeMark.id ? "更新成功" : "添加成功",
        });
        //再次获取全部已有的品牌
        //更新留在当前页、添加留在第一页
        getTradeMarkList(tradeMark.id ? pageNo.value : 1)
    } catch (error) {
        ElMessage({
            type: "error",
            message: tradeMark.id ? "更新失败" : "添加失败",
        })
    }
}
const handleCloseDialog = () =>{
    showDialog.value = false;
}
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getTradeMarkList()
}
const handleCurrentChange = (val: number) => {
    pageNo.value = val
    getTradeMarkList(pageNo.value)
}

// 导出数据
const downLoad = () => {
    // 创建json数据转Excel需要的格式
    const worksheet = XLSX.utils.json_to_sheet(tradeMarkList.value);
    // 给Excel创建一个容器
    const workbook = XLSX.utils.book_new();
    // 把数据追加到Excel容器中
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    // 导出数据:第二个参数是文件名
    XLSX.writeFile(workbook, "Presidents.xlsx")

}
</script>

<style scoped>
    .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    }
    /* 使用 ::v-deep 选择器 */
    ::v-deep .el-dialog {
    margin-top: 100px;
    }
</style>

<style>

    .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    }

    .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    }
</style>