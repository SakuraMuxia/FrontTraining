import { getDistrictList } from '@/api/hospital/hospitalList';
import { IDistrictList } from '@/api/hospital/model/hospitalListType'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'

export default function Dict() {
    const columns:ColumnsType<any> = [
        {
            title:'名称',
            dataIndex: 'name'
        },
        {
            title:'编码',
            dataIndex: 'dictCode'
        },
        {
            title:'值',
            dataIndex: 'value'
        },
        {
            title:'创建时间',
            dataIndex: 'createTime'
        }
    ]
    // 定义数据类型
    let [dictList, setDictList] = useState<IDistrictList>([]);
    // 获取省市区方法
    const _getDictList = async () => {
        let dictList = await getDistrictList(1);
        setDictList(dictList);
    }
    // 生命周期函数
    useEffect(() => {
        _getDictList();
    }, [])

    return (
        <Card>
            <Table
                rowKey={'id'}
                columns={columns}
                pagination={false}
                dataSource={dictList}
                expandable={{
                    expandIcon: ({ expanded, onExpand, record }) => {
                        // console.log('expanded: ', expanded);// 展开标识 boolean
                        // console.log('onExpand: ', onExpand);// 展开函数
                        // console.log('record: ', record);// 当前行对象

                        // 首先判断当前行对象中是否有子节点
                        if(!record.hasChildren){
                            // 返回一个空标签
                            return <div style={{display:'inline-block',width:15}}></div>
                        }
                        return expanded ? (
                            <DownOutlined onClick={e => onExpand(record, e)} />
                        ) : (
                            <RightOutlined onClick={async e => {
                                // 获取当前行记录的子节点，加入record，进行展开
                                // 请求子节点的数据
                                if (!record.children?.length) {// record没有children属性或者record.children 数组的长度是 0，匹配逻辑判断
                                    let children = await getDistrictList(record.id);
                                    // 把这些子节点的信息添加到record对象children属性，就可以使用onExpand展开
                                    record.children = children;
                                }
                                onExpand(record, e)

                            }} />
                        )
                    }
                }}
            />
        </Card>
    )
}
