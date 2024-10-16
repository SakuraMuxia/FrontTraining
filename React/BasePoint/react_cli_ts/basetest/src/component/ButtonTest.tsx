import React, { useState } from 'react'
import { Button } from 'antd'
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
export default function ButtonTest() {
    let [loading, setLoading] = useState(false);
    return (
        <>
            <h3>Button按钮</h3>
            <Button type='primary'>按钮</Button>
            {/* 设置图标 */}
            <Button type="primary" icon={<SearchOutlined />} block >
                Search
            </Button>
            {/* 危险按钮 */}
            <Button danger type='primary'>danger</Button>
            {/* 禁用效果 */}
            <Button type='primary' disabled>disabled</Button>
            {/* 设置超链接行为 */}
            <Button href='http://baidu.com'>百度</Button>
            {/* 给按钮设置图标，并设置按钮提交属性 */}
            <Button htmlType='submit' icon={<QuestionCircleOutlined />}>htmlType</Button>
            {/* 原生button */}
            <button type='submit'>提交</button>

            <QuestionCircleOutlined />
            {/* 使用loading状态 */}
            <Button loading={loading}>loading</Button>
            {/* 使用loading状态 */}
            <Button onClick={() => {
                setLoading(!loading)
            }}> changeLoading</Button>
            {/* Button按钮是一个图标 */}
            <Button shape='circle' icon={<SearchOutlined />}></Button>
        </>
    )
}