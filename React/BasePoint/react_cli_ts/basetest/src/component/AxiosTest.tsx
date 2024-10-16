import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/github';
import { IUserItem, IUserList } from '../api/model/githubType';
import Table, { ColumnsType } from 'antd/es/table';


export default function AxiosTest() {
    let [users, setUsers] = useState<IUserList>([])
    // 设置默认值 total
    let [total, setTotal] = useState<number>(10)
    let [current, setCurrent] = useState<number>(1)
    let [pageSize, setPageSize] = useState<number>(3)
    // 定义生命周期函数
    useEffect(() => {
        async function main() {
            let res = await getUsers('sakuramuxia')
            console.log(res)
            setUsers(res.items); // 设置数据状态
            // 设置总条数
            setTotal(res.items.length);
        }
        main();
    }, [])
    // 设置列数据
    const columns: ColumnsType<IUserItem> = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: 'login',
            dataIndex: 'login'
        },
        {
            title: '头像',
            render(row: IUserItem) {
                return <a href={row.html_url}><img width={100} src={row.avatar_url} /></a>
            }
        }
    ]
    // 渲染数据
    return (
        <div>
            <h3>axios请求数据渲染table练习</h3>
            <Table 
                rowKey={'id'}
                columns={columns}
                dataSource={users}
                pagination={{
                    current,
                    pageSize,
                    total,
                    onChange: (page: number, pageSize: number) => {
                        setCurrent(page)
                        setPageSize(pageSize)
                    }
                }}
            />
        </div>
    )
}
