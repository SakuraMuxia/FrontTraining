import { getHospitalDetail } from '@/api/hospital/hospitalList';
import { IBookingRule, IHospitalItem } from '@/api/hospital/model/hospitalListType';
import { Button, Card, Descriptions, Image } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function HospitalDetail() {
    // 获取path参数
    let {id} = useParams();
    // 定义数据状态
    let [hospital, setHospital] = useState<IHospitalItem>();
    let [bookingRule, setBookingRule] = useState<IBookingRule>();
    // 定义方法
    const _getHospitalDetail = async ()=>{
        let {bookingRule,hospital} = await getHospitalDetail(id as string);
        setHospital(hospital);
        setBookingRule(bookingRule);
    }
    useEffect(()=>{
        id && _getHospitalDetail();
    }, [])
    return (
        <Card>
            <Descriptions title="基本信息" bordered>
                <Descriptions.Item labelStyle={{ width: 200 }} label="医院名称" span={1.5}>{hospital?.hosname}</Descriptions.Item>
                <Descriptions.Item label="医院logo" span={1.5}>
                    {hospital?.logoData && <Image width={100} src={'data:image/jpg;base64,' + hospital?.logoData} />}
                </Descriptions.Item>
                <Descriptions.Item label="医院编码" span={1.5}>{hospital?.hoscode}</Descriptions.Item>
                <Descriptions.Item label="医院地址" span={1.5}>{hospital?.param.fullAddress}</Descriptions.Item>
                <Descriptions.Item label="坐车路线" span={3}>
                    {hospital?.route}
                </Descriptions.Item>
                <Descriptions.Item label="医院简介" span={3}>
                    {hospital?.intro}
                </Descriptions.Item>
            </Descriptions>

            <Descriptions title="预约规则" bordered className='mt'>
                <Descriptions.Item label="预约周期" span={1.5}>{bookingRule?.cycle}</Descriptions.Item>
                <Descriptions.Item label="放号时间" span={1.5}>{bookingRule?.releaseTime}</Descriptions.Item>
                <Descriptions.Item label="停挂时间" span={1.5}>{bookingRule?.quitDay}</Descriptions.Item>
                <Descriptions.Item label="退号时间" span={1.5}>{bookingRule?.quitTime}</Descriptions.Item>
                <Descriptions.Item label="预约规则" span={3}>
                    {bookingRule?.rule.map((item,index)=>(
                        <div key={index}>{item}</div>
                    ))}
                </Descriptions.Item>
            </Descriptions>

            <Button className='mt'>返回</Button>
        </Card>
    )
}
