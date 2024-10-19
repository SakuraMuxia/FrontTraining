import { addHospitalSet, getHospitalSetById, updateHospitalSet } from '@/api/hospital/hospitalSet'
import { Button, Card, Form, Input, message, Space } from 'antd'
import React, { useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'

export default function AddOrUpdate() {
    // 获取路径的参数
    let { id } = useParams();
    // 定义form对象
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const onFinish = async () => {
        let data = form.getFieldsValue()
        try {
            if (id) {
                // 给data请求体添加id属性
                data.id = id;
                // 发送更新请求
                await updateHospitalSet(data);
                message.success('更新成功');
            } else {
                await addHospitalSet(data);
                message.success('添加成功');
            }
            // 刷新页面
            navigate('/syt/hospital/hospitalSet')
        }catch(e){
            message.error('添加失败')
        }
    }
    // 定义获取医院数据的方法
    const _getHospitalSetById = async () => {
        let data = await getHospitalSetById(id as string)
        // console.log(data);
        // 将请求回来的数据，渲染到表单
        form.setFieldsValue(data);
    }
    // 使用条件表达式 设置生命周期
    useEffect(() => {
        // id 存在 说明是编辑操作，发请求获取数据
        // id 不存在 说明是添加操作，不发请求
        id && _getHospitalSetById();
    }, [])
    return (
        <Card>
            <Form
                name="basic"
                // 设置标签宽度
                labelCol={{ span: 2 }}
                // 设置输入框的宽度
                wrapperCol={{ span: 22 }}
                onFinish={onFinish}
                form={form}

            >
                <Form.Item
                    label="医院名称"
                    name="hosname"
                    rules={[{ required: true, message: '请输入医院名称!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="医院编号"
                    name="hoscode"
                    rules={[{ required: true, message: '请输入医院编号!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="api基础路径"
                    name="apiUrl"
                    rules={[{ required: true, message: '请输入api基础路径!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="联系人姓名"
                    name="contactsName"
                    rules={[{ required: true, message: '请输入联系人姓名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="联系人手机"
                    name="contactsPhone"
                    rules={[{ required: true, message: '请输入联系人手机!' }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button onClick={()=>navigate(-1)}>返回</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    )
}
