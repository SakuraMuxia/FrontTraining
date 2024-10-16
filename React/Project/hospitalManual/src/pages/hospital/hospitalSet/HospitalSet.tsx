import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { IHospitalSetList } from '@/api/hospital/model/hospitalSetType'
import { getHospitalSetList } from '@/api/hospital/hospitalSet'
export default function HospitalSet() {
    // 定义一个静态数据:列数据
    const columns: ColumnsType<any> = [
        {
            // 手动计算序号
            title: '序号',
            render(value: any, row: any, index: number) {
                return (current - 1) * pageSize + (index + 1)
            }
        },
        {
            title: '医院名称',
            dataIndex: 'hosname'
        },
        {
            title: '医院编号',
            dataIndex: 'hoscode'
        },
        {
            title: 'api基础路径',
            dataIndex: 'apiUrl'
        },
        {
            title: '签名',
            dataIndex: 'signKey'
        },
        {
            title: '联系人姓名',
            dataIndex: 'contactsName'
        },
        {
            title: '联系人手机',
            dataIndex: 'contactsPhone'
        },
        {
            title: '操作',
            render(row: any) {
                return (
                    <Space>
                        <Button type='primary' icon={<EditOutlined />}>编辑</Button>
                        <Button type='primary' icon={<DeleteOutlined />} danger>删除</Button>
                    </Space>
                )
            }
        }
    ]
    // 数据状态
    // 分页相关状态
    let [current, setCurrent] = useState<number>(1);
    let [pageSize, setPageSize] = useState<number>(3);
    let [total, setTotal] = useState<number>(10);
    // 医院设置列表类型
    let [hospitalSetList, setHospitalSetList] = useState<IHospitalSetList>([]);
    let [hosname, setHosname] = useState<string>();
    let [hoscode, setHoscode] = useState<string>();
    // 设置loading状态
    let [loading,setLoading] = useState<boolean>(false);
    // 定义异步请求
    async function _getHospitalSetList() {
        setLoading(true);
        let { records, total } = await getHospitalSetList(current, pageSize, hosname, hoscode);
        // 设置状态
        setHospitalSetList(records);
        setTotal(total);
        setLoading(false);
    }
    // 声明周期 
    useEffect(() => {
        // 调用异步请求
        _getHospitalSetList();
    }, [current, pageSize])

    return (
        <Card>
            <Form
                layout='inline'
            >
                <Form.Item>
                    <Input placeholder='医院名称' />
                </Form.Item>
                <Form.Item>
                    <Input placeholder='医院编号' />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type='primary'>查询</Button>
                        <Button>清空</Button>
                    </Space>
                </Form.Item>
            </Form>

            {/* 这里的className:mt 是在 src/style/index.css引入的全局样式 */}
            <Space className='mt'>
                <Button type='primary'>添加</Button>
                <Button disabled>批量删除</Button>
            </Space>

            <Table
                className='mt'
                rowKey={'id'}
                columns={columns}
                dataSource={hospitalSetList}
                loading={loading}
                pagination={{
                    current,
                    pageSize,
                    total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: [3, 5, 10, 20],
                    onChange: (page: number, pageSize: number) => {
                        setCurrent(page);
                        setPageSize(pageSize)
                        console.log(hospitalSetList)
                    }
                }}
            />
        </Card>
    )
}