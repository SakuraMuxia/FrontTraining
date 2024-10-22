import { getDepartmentList, getDoctorList, getScheduleList } from '@/api/hospital/hospitalList'
import { IBookingScheduleList, IDepartmentList, IDoctorList } from '@/api/hospital/model/hospitalListType'
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
            title: '序号',
            render(value:any, row:any, index:number){
                return (index + 1);
            }
        },
        {
            title: '职称',
            dataIndex:'title'
        },
        {
            title: '号源时间',
            width:120,
            dataIndex:'workDate'
        },
        {
            title: '总预约数',
            dataIndex:'reservedNumber'
        },
        {
            title: '剩余预约数',
            dataIndex:'availableNumber'

        },
        {
            title: '挂号费(元)',
            dataIndex:'amount'
        },
        {
            title: '擅长技能',
            dataIndex:'skill'
        }
    ]

    // 获取参数
    const {hoscode} = useParams()
    let [departmentList, setDepartmentList] = useState<IDepartmentList>([]);
    let [expandedKeys, setExpandedKeys] = useState<string[]>([]);// 一级科室depcode组成的数组
    let [depname, setDepname] = useState<string>();
    let [depcode, setDepcode] = useState<string>();

    let [current, setCurrent] = useState<number>(1);
    let [pageSize, setPageSize] = useState<number>(3);
    let [total, setTotal] = useState<number>(10);
    let [bookingScheduleList, setBookingScheduleList] = useState<IBookingScheduleList>([]);
    let [hosname, setHosname] = useState<string>();
    let [workDate, setWorkDate] = useState<string>();
    // 医生列表
    let [doctorList, setDoctorList] = useState<IDoctorList>([]);
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
    //获取医院科室 排班日期数据
    const _getScheduleList = async () => {
        let { total, bookingScheduleList, baseMap: { hosname } } = await getScheduleList(current, pageSize, hoscode as string, depcode as string);
        setTotal(total)
        setBookingScheduleList(bookingScheduleList)
        setHosname(hosname)
        // 设置排班日期状态
        setWorkDate(bookingScheduleList[0].workDate);
    }
    // 获取排班医生列表数据
    const _getDoctorList = async ()=>{
        let doctorList = await getDoctorList(hoscode as string, depcode as string, workDate as string);
        // console.log('doctorList: ', doctorList);
        setDoctorList(doctorList);
    }
    // 生命周期
    useEffect(()=>{
        hoscode && _getDepartmentList();
    }, [])
    useEffect(() => {
        depcode && _getScheduleList();// 获取排班日期分页列表数据
    }, [depcode, current, pageSize]);
    useEffect(()=>{// 组件挂载完成之后执行 + workDate变化后执行
        workDate && _getDoctorList();
    }, [workDate]);
    return (
        <Card>
            <div>选择：北京人民医院 / {depname} / 2023-07-28</div>
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
                            onSelect={(selectedKeys: any,info: any)=>{ // a 是hoscode b是事件对象event
                                setDepcode(info.node.depcode);
                                setDepname(info.node.depname);
                            }}
                        />
                    </div>
                </Col>
                <Col span={19}>
                    {bookingScheduleList.map((item,index)=>(
                        <Tag 
                            color={workDate===item.workDate ? 'green':''} 
                            key={item.workDate}
                            onClick={()=>{setWorkDate(item.workDate)}}
                            >
                                <div>{item.workDate} {item.dayOfWeek}</div>
                                <div>{item.availableNumber} / {item.reservedNumber}</div>
                        </Tag>
                    ))}

                    <Pagination
                        current={current}
                        total={total}
                        className='mt'
                        pageSize={pageSize}
                        onChange={(page:number, pageSize)=>{
                            setCurrent(page);
                            setPageSize(pageSize);
                        }}
                    />

                    <Table
                        className='mt'
                        pagination={false}
                        columns={columns}
                        dataSource={doctorList}
                        rowKey={'id'}
                    />

                    <Button className='mt'>返回</Button>
                </Col>

            </Row>
        </Card>
    )
}
