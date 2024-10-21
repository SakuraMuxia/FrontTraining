import { getDepartmentList } from '@/api/hospital/hospitalList'
import { IDepartmentList } from '@/api/hospital/model/hospitalListType'
import { Button, Card, Col, Pagination, Row, Table, Tag, Tree } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// 获取视口的高度
let height = document.documentElement.clientHeight - 180

export default function HospitalSchedule() {
    // 列数据
    const columns: ColumnsType<any> = [
        {
            title: '序号'
        },
        {
            title: '职称'
        },
        {
            title: '号源时间'
        },
        {
            title: '总预约数'
        },
        {
            title: '剩余预约数'
        },
        {
            title: '挂号费(元)'
        },
        {
            title: '擅长技能'
        }
    ]

    // 获取参数
    const {hoscode} = useParams()
    let [departmentList, setDepartmentList] = useState<IDepartmentList>([]);
    let [expandedKeys, setExpandedKeys] = useState<string[]>([]);// 一级科室depcode组成的数组
    let [depname, setDepname] = useState<string>();
    let [depcode, setDepcode] = useState<string>();
    // 方法
    // 获取排班列表数据
    const _getDepartmentList = async()=>{
        let departmentList = await getDepartmentList(hoscode as string);
        // console.log(departmentList)
        // 禁用一级科室树节点，就是给所有的一级科室对象，添加一个disabled:true
        departmentList = departmentList.map(item=>{
            item.disabled = true;
            return item;
        })
        setDepartmentList(departmentList);// 设置科室列表状态数据
        // 展开所有的一级科室
        // 1. 获取所有一级科室 depcode组成的数组
        let expandedKeys = departmentList.map(item=>item.depcode)
        setExpandedKeys(expandedKeys);
        // 2. 处理默认选中科室
        let depname = (departmentList[0].children as IDepartmentList)[0].depname;
        let depcode = (departmentList[0].children as IDepartmentList)[0].depcode;
        // 设置科室名和科室code状态
        setDepname(depname);
        setDepcode(depcode);
    }
    // 生命周期
    useEffect(()=>{
        hoscode && _getDepartmentList();
    }, [])
    return (
        <Card>
            <div>选择：北京人民医院 / 多发性硬化专科门诊 / 2023-07-28</div>
            {/* gutter 栅格间隙 这里组件来自 antd中的栅格组件 */}
            <Row className='mt' gutter={30}>
                <Col span={5}>
                    <div style={{ border: '1px solid #ddd', height, overflowY: 'scroll' }}>
                        <Tree
                            // 设置数据源
                            treeData={departmentList as []}
                            // 自定义节点 title、key、children 的字段
                            fieldNames={{
                                title:'depname',
                                key:'depcode'
                            }}
                            // （受控）展开指定的树节点
                            expandedKeys={expandedKeys}
                            // （受控）设置选中的树节点
                            selectedKeys={[depcode as string]}
                        />
                    </div>
                </Col>
                <Col span={19}>
                    <Tag color="green">
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>
                    <Tag>
                        <div>2023-07-28 周五</div>
                        <div>38 / 100</div>
                    </Tag>

                    <Pagination
                        defaultCurrent={6}
                        total={500}
                        className='mt'
                    />

                    <Table
                        className='mt'
                        pagination={false}
                        columns={columns}
                    />

                    <Button className='mt'>返回</Button>
                </Col>

            </Row>
        </Card>
    )
}
