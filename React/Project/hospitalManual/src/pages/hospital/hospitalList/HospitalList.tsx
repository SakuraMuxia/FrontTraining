import { Button, Card, Form, Image, Input, Select, Space } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import { changeStatus, getDistrictList, getHospitalList } from '@/api/hospital/hospitalList'
import { IDistrictList, IHospitalList,IHospitalItem, IFormFields } from '@/api/hospital/model/hospitalListType';
import { useNavigate } from 'react-router-dom';

// 解构出选项列表
const { Option } = Select;

export default function HospitalList() {
	const [form] = Form.useForm();
	const navigate = useNavigate()
	const columns: ColumnsType<any> = [
		{
			title: '序号',
			render(value:any, row:any, index:number){
                return (current - 1) * pageSize + (index + 1)
            }
		},
		{
			title: '医院logo',
            render(row:IHospitalItem){
                return (
                    <Image width={100} src={'data:image/jpg;base64,' + row.logoData}/>
                )
            }
		},
		{
			title: '医院名称',
			dataIndex:'hosname'

		},
		{
			title: '等级',
			render(row:IHospitalItem){
                return row.param.hostypeString
            }
		},
		{
			title: '详细地址',
			render(row:IHospitalItem){
                return row.param.fullAddress
            }
		},
		{
			title: '状态',
            render(row:IHospitalItem){
                return row.status ? '已上线' : '未上线'
            }
		},
		{
			title: '创建时间',
            dataIndex:'createTime'
		},
		{
			render(row:IHospitalItem){
                return (
                    <Space>
                        <Button type='primary' onClick={()=>{navigate('/syt/hospital/hospitalList/show/' + row.id)}}>查看</Button>
                        <Button type='primary' onClick={()=>{navigate('/syt/hospital/hospitalList/schedule/' + row.hoscode)}}>排班</Button>
                        <Button type='primary' onClick={()=>updateStatus(row.id, row.status ? 0: 1)}>{row.status ? '下线' : '上线'}</Button>
                    </Space>
                )
            }
		}
	]
	
	// 定义省市区数据状态
    let [hospitalList, setHospitalList] = useState<IHospitalList>([]);
	let [total, setTotal] = useState<number>(10);
	let [current, setCurrent] = useState<number>(1);
    let [pageSize, setPageSize] = useState<number>(3);
	let [loading, setLoading] = useState<boolean>(false);
	let [provinceList, setProvinceList] = useState<IDistrictList>([])
    let [cityList, setCityList] = useState<IDistrictList>([])
    let [dictList, setDictList] = useState<IDistrictList>([])
	let [typeList,setTypeList] = useState<IDistrictList>([])
	// 定义查询params
	let [formFields, setFormFields] = useState<IFormFields>({
        hoscode: undefined,
        hosname: undefined,
        provinceCode: undefined,
        cityCode: undefined,
        districtCode: undefined,
        status: undefined,
        hostype: undefined
    })

	// 定义获取省市区的方法
	// 获取省列表
    const getProvinceList = async () => {
        const provinceList = await getDistrictList(86);
        // 设置省状态数据
        setProvinceList(provinceList);
    }
    // 根据省id 获取是列表并渲染
    const getCityList = async (id: number) => {
		// 将市、区的表单项赋值为undefined
		form.setFieldsValue({
			cityCode:undefined,
			districtCode:undefined
		})
		// 将区的状态数据设置为空数组
        setDictList([]);
		// onSelect=function(value) value的值为选中的value的值
        const cityList = await getDistrictList(id);
        setCityList(cityList);
    }
    // 根据市id 获取区列表并渲染
    const getDictList = async (id: number) => {
		// 将区的表单值设置为undefined
        form.setFieldsValue({
            districtCode:undefined
        })
        const dictList = await getDistrictList(id);
        setDictList(dictList);
    }
	// 获取医院等级
	const getDegree = async() => {
		let degree = await getDistrictList(10000)
		setTypeList(degree)
	}

	// 获取医院分页列表数据
	const _getHospitalList = async()=>{
		setLoading(true);
		let {content, totalElements} = await getHospitalList({ page: current, limit: pageSize, ...formFields });
		setHospitalList(content);
        setTotal(totalElements);
        setLoading(false);
		
	}

	// 医院查询功能
	const search = () => {
        
        setFormFields(form.getFieldsValue());// 获取表单数据最新的值，设置到formFields状态数据中
        setCurrent(1);
    }
	// 清空功能
	const clear = () => {
        // 清空form表单的数据
        // 清空 formFields 状态的值都为 undefined
        // 当前页设置为 1
        form.resetFields();
        setFormFields({
            hoscode: undefined,
            hosname: undefined,
            provinceCode: undefined,
            cityCode: undefined,
            districtCode: undefined,
            status: undefined,
            hostype: undefined
        })
        setCurrent(1);
    }

	// 改变医院状态函数
	const updateStatus = async (id:string, status:number)=>{
        
        await changeStatus(id, status);
        // 重新获取列表
        _getHospitalList();
    }

	// 定义生命周期函数
	useEffect(() => {
		// 获取省
        getProvinceList();
		// 获取等级
		getDegree()
    }, [])

	// 定义生命周期函数2
	useEffect(()=>{
        _getHospitalList();
    },[current, pageSize, formFields.hoscode, formFields.hosname, formFields.cityCode, formFields.provinceCode, formFields.districtCode, formFields.hostype, formFields.status])

	return (
		<Card>
            <Form 
				layout='inline'
				form={form}
				onFinish={search}
				>
                <Form.Item name='provinceCode'>
                    <Select 
						className='mb' 
						placeholder='请选择省' 
						style={{ width: 180 }}
						onSelect={(value:any)=>{getCityList(value)}}
						>
                        {provinceList.map(province => (
                            <Option value={province.value} key={province.id}>{province.name}</Option>
                        ))}
                        
                    </Select>
                </Form.Item>
                <Form.Item name='cityCode'>
                    <Select 
						placeholder='请选择市' 
						style={{ width: 180 }}
						onSelect={getDictList}
						>
                        {cityList.map(city => (
                            <Option key={city.id} value={city.value}>{city.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='districtCode'>
					<Select placeholder='请选择区' style={{ width: 180 }}>
                        {dictList.map(dict => (
                            <Option key={dict.id} value={dict.value}>{dict.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name='hosname'>
                    <Input placeholder='医院名称'/>
                </Form.Item>
                <Form.Item name='hoscode'>
                    <Input placeholder='医院编号'/>
                </Form.Item>
                <Form.Item name='hostype'>
                    <Select 
						placeholder='医院类型' 
						style={{ width: 180 }}
						>
							{typeList.map(type=>(
								<Option value={type.value} key={type.id}>{type.name}</Option>
							))}
                        
                    </Select>
                </Form.Item>
                <Form.Item name='status'>
                    <Select placeholder='医院状态' style={{ width: 180 }}>
                        <Option value={0}>未上线</Option>
                        <Option value={1}>已上线</Option>
                        
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button type='primary' htmlType='submit'>查询</Button>
                        <Button disabled={Object.values(formFields).every(item => item === undefined)} onClick={clear}>清空</Button>
                    </Space>
                </Form.Item>
            </Form>

            <Table
                className='mt'
				rowKey={'id'}
                columns={columns}
				dataSource={hospitalList}
				loading={loading}
                pagination={{
                    current,
                    pageSize,
                    total,
                    onChange(page:number, pageSize:number){
                        setCurrent(page);
                        setPageSize(pageSize);
                    }
                }}
            />
        </Card>
	)
}


