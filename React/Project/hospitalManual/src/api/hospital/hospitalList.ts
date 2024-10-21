import { request } from "@utils/http"
import { IDepartmentList, IDistrictList, IHospitalDetail, IHospitalListParams, IHospitalListResponse } from "./model/hospitalListType"
/**
 * 根据id 获取省市区列表
 * @param id  86 省  
 * @returns 
 */
export const getDistrictList = (id: number) => {
    return request.get<any, IDistrictList>('/admin/cmn/dict/findByParentId/' + id)
}

// 获取医院列表分页数据,同时定义请求体的类型和响应体的类型
export const getHospitalList = ({page,limit,hoscode,hosname,hostype,provinceCode,cityCode,districtCode,status}:IHospitalListParams)=>{
    return request.get<any, IHospitalListResponse>(`/admin/hosp/hospital/${page}/${limit}`, {
        params:{
            hoscode,
            hosname,
            hostype,
            provinceCode,
            cityCode,
            districtCode,
            status
        }
    })
}

// 获取医院详情返回值api
export const getHospitalDetail = (id:string) => {
    return request.get<any,IHospitalDetail>(`/admin/hosp/hospital/show/${id}`)
}
// 调整医院上下线
export const changeStatus = (id:string, status:number)=>{
    return request.get<any,null>(`/admin/hosp/hospital/updateStatus/${id}/${status}`);
}
// 获取医院排盘
export const getDepartmentList = (hoscode:string)=>{
    return request.get<any, IDepartmentList>(`/admin/hosp/department/${hoscode}`)
}