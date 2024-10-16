import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

export default function FromTest() {
    // 设置onFinish方法，不知道values的属性，暂时使用any指定类型
    const onFinish = (values: any) => {
        // values 当点击 submit提交按钮的时候触发，并将表单数据收集到values中
        console.log('Success:', values);
    }

    return (
        <>
            <h3>Form表单组件</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }} // 文字宽度
                wrapperCol={{ span: 16 }} // 表单宽度
                initialValues={{ remember: false, username: '' }} // 设置默认值
                onFinish={onFinish} // 当点击提交按钮时，执行的回调函数
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
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法' } // 使用正则表达式验证手机号格式
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
                </Form.Item>
            </Form>
        </>
    )
}
