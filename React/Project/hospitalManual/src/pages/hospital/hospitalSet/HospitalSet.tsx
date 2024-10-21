import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, Space, Table, Modal, message } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/lib/table'
import { IHospitalSetList } from '@/api/hospital/model/hospitalSetType'
import { delHospitalById, getHospitalSetList, removeBatch } from '@/api/hospital/hospitalSet'
import { useNavigate } from 'react-router-dom'
const { confirm } = Modal

export default function HospitalSet() {
    // 定义一个静态数据:列数据
    const columns: ColumnsType<any> = [
        {
            // 手动计算序号
            title: '序号',
            width:60,
            align:'center',
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
            width:120,
            fixed:'right',
            render(row: any) {
                return (
                    <Space>
                        <Button type='primary' icon={<EditOutlined />} onClick={() => { editHospitalById(row.id) } }>编辑</Button>
                        <Button type='primary' icon={<DeleteOutlined />} onClick={() => { deleteHospitalById(row.id) }} danger>删除</Button>
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
    // 创建form对象
    let [form] = Form.useForm();
    // 创建 编程式导航对象 
    let navigate = useNavigate();
    // 定义复选框数组
    let [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

    // 方法
    // 定义异步请求
    async function _getHospitalSetList() {
        setLoading(true);
        let { records, total } = await getHospitalSetList(current, pageSize, hosname, hoscode);
        // 设置状态
        setHospitalSetList(records);
        setTotal(total);
        setLoading(false);
    }

    

    // 搜索方法
    const search = () => {
        // 获取form表单中的数据
        let { hosname, hoscode } = form.getFieldsValue();
        // 设置数据状态
        setHosname(hosname);
        setHoscode(hoscode);
        // 检索从第一页开始查看
        current !== 1 && setCurrent(1);
    }

    // 清空方法
    const clear = () => {
        // 1. 重置表单 hosname 和 hoscode ==>界面
        // 2. 重置 状态 hosname 和 hoscode  ===> 重发请求的
        form.resetFields();
        setHosname(undefined);
        setHoscode(undefined);
        setCurrent(1);
    }

    // 删除医院方法
    const deleteHospitalById = (id:string) => {
        // 弹窗
        confirm({
            title: '确定删除么?',
            icon: <ExclamationCircleFilled />,
            content: '删除当前记录',
            async onOk() {
                // 发送删除医院请求
                await delHospitalById(id)
                message.success('删除成功')
                // 刷新页面
                _getHospitalSetList()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 批量删除医院的方法
    const batchRemove = (ids: React.Key[]) => {
        // 弹窗
        confirm({
            title: '确定删除么?',
            icon: <ExclamationCircleFilled />,
            content: '删除当前记录',
            async onOk() {
                // 发送删除医院请求
                await removeBatch(ids)
                // 将selectedKeys状态清空成空数组
                setSelectedKeys([]);
                message.success('删除成功')
                // 刷新页面
                _getHospitalSetList()
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 编辑医院方法
    const editHospitalById = (id: string) => {
        // 导航到页面
        navigate('/syt/hospital/hospitalSet/edit/'+id)

        
    }
    // 声明周期 
    useEffect(() => {
        // 调用异步请求
        _getHospitalSetList();
    }, [current, pageSize, hosname, hoscode])


    return (
        <Card>
            <Form
                layout='inline'
                onFinish={search}
                form={form}
            >
                <Form.Item name='hosname'>
                    <Input placeholder='医院名称' />
                </Form.Item>
                <Form.Item name='hoscode'>
                    <Input placeholder='医院编号' />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button onClick={clear} disabled={hosname === undefined && hoscode === undefined}>清空</Button>
                    </Space>
                </Form.Item>
            </Form>

            {/* 这里的className:mt 是在 src/style/index.css引入的全局样式 */}
            <Space className='mt'>
                <Button type='primary' onClick={() => navigate('/syt/hospital/hospitalSet/add')}>添加</Button>
                <Button disabled={selectedKeys.length === 0} onClick={() => { batchRemove(selectedKeys) }}>批量删除</Button>
            </Space>

            <Table
                className='mt'
                rowKey={'id'}
                columns={columns}
                dataSource={hospitalSetList}
                loading={loading}
                // 设置宽度
                scroll={{x:1300}}
                // 设置复选框
                rowSelection={{
                    /**
                     * onChange调用时机，列表复选框发生变化的时候
                     * @param selectedKeys 选中条id组成的数组
                     */
                    onChange(selectedKeys: React.Key[]) {
                        console.log('selectedKeys: ', selectedKeys)
                        setSelectedKeys(selectedKeys);
                    }
                }}
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
                        
                    }
                }}
            />
        </Card>
    )
}