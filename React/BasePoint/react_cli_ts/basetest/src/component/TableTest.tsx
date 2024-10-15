import React, { useState } from 'react'
import { Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table';


export default function TableTest() {
    // 这里的IUserItem泛型是给ColumnsType组件使用的，ColumnsType是antd定义的看不到怎么用
    // IUserItem他是确定每个数据中元素的格式
    const columns: ColumnsType<IUserItem> = [
        {
            title: '姓名', // title 属性是表头信息
            dataIndex: 'name', // 渲染dataSource数据源中的哪个字段[属性]
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
        },
        // 自定义渲染
        {
            title:'操作',
            dataIndex: 'age',
            render(text: number, record: IUserItem,index:number){
                return(
                    <>
                        <Button type='primary' danger onClick={()=>{
                            console.log('text',text)
                            console.log('record', record)
                            console.log('index', index)
                        }}>删除</Button>
                    </>
                )
            }

        }
    ]
    // 定义数据源的类型
    interface IUserItem {
        id: number;
        name: string;
        age: number;
        address: string;
    }
    // 定义一个数组类型
    type IUserList = IUserItem[]
    // 定义数据
    const dataSource: IUserList = [
        {
            id: 1,
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            id: 2,
            name: '吴彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 3,
            name: '迪丽热巴',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 4,
            name: '古力娜扎',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 5,
            name: '佟丽娅',
            age: 42,
            address: '西湖区湖底公园1号',
        }
    ]
    // 设置分页相关状态,设置数据状态的类型
    let [current, setCurrent] = useState<number>(1);// 当前页
    let [pageSize, setPageSize] = useState<number>(2); // 每页几条
    let [total, setTotal] = useState<number>(5); // 总条数
    return (
        <div>
            <h3>Table组件</h3>
            <Table
                rowKey='id'  // 修改antd默认，指定key取值从属性名为'id'中获取
                columns={columns}
                dataSource={dataSource}
                // 使用pagination实现分页功能
                pagination={{
                    current, // 当前页
                    pageSize, // 每页显示几条 
                    total,// 总条数
                    showQuickJumper: true, // 快速跳转
                    showSizeChanger: true, // 每页显示几条下拉框
                    pageSizeOptions: [2, 3, 5, 10], // 下拉框选项
                    // 总条数自定义显示
                    showTotal: (total: number) => {
                        return (
                            <div>
                                总体条数是: <span style={{ color: 'red' }}>{total}</span>
                            </div>
                        )
                    },
                    // 监听Change事件
                    onChange:(page:number,pageSize:number)=>{
                        // 设置页码
                        setCurrent(page);
                        setPageSize(pageSize);
                    }
                }}
            />
        </div>
    )
}