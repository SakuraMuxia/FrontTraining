import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

export default function FormData() {
    /**
     * 使用 form对象操作表单的好处，可以更方便的操作表单数据
     * 获取表单数据的第二种方式：
     * 1. 创建一个form对象
     * 2. 给Form表单组件绑定 form对象
     * 3. 通过form的api对表单数据进行操作 
     */

    const [form] = Form.useForm(); // 1. 创建form对象,antd固定写法

    const onFinish = (values: any) => {
        // values 当点击 submit提交按钮的时候触发，并将表单数据收集到values中
        console.log('Success:', values);
        // getFieldsValue 获取表单的数据
        console.log('form data: ', form.getFieldsValue());
    };

    const reset = () => {
        console.log('reset');
        // form.resetFields(); // 恢复初始值

        form.setFieldsValue({ // 可以指定表单值的字段，进行批量设置
            username: 'atguigu',
            password: '123123',
            phone: 13141801331
        })
    }



    return (
        <>
            <h3>Form表单组件 数据处理</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }} // 文字宽度
                wrapperCol={{ span: 16 }} // 表单宽度
                initialValues={{ remember: false, username: '' }} // 设置默认值
                onFinish={onFinish} // 提交按钮的回调函数
                // 绑定form对象到表单组件
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="phone"
                    name="phone"
                    rules={[
                        { required: true, message: '手机号必填' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={reset}>清空</Button>
                </Form.Item>
            </Form>
        </>
    )
}