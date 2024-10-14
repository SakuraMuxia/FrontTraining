import React from 'react'
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

    interface IUserItem {
        id: number;
        name: string;
        age: number;
        address: string;
    }
    // 定义一个数组类型
    type IUserList = IUserItem[]

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
        }
    ]
    return (
        <div>
            <h3>Table组件</h3>
            <Table
                rowKey='id'  // 修改antd默认，指定key取值从属性名为'id'中获取
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    )
}