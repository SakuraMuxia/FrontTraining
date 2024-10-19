import { request } from '@utils/http'
import { IHospitalSetListResponse,IHospitalSetData, IHospitalSetUpdateData } from './model/hospitalSetType'

/**
 * 医院设置相关api函数
 * @param page 当前页 必填
 * @param limit 每页几条 必填
 * @param hosname 医院名称
 * @param hoscode 医院编号
 * @returns 
 */
export const getHospitalSetList = (page: number, limit: number, hosname?: string, hoscode?: string) => {
    return request.get<any, IHospitalSetListResponse>(`/admin/hosp/hospitalSet/${page}/${limit}`, {
        params: {
            hosname,
            hoscode
        }
    })
}

// 添加医院设置
export const addHospitalSet = (data: IHospitalSetData) => {
    // <any, null> any为了占位 null定位定义响应体类型
    return request.post<any, null>('/admin/hosp/hospitalSet/save', data)
}

// 删除医院
export const delHospitalById = (id:string) => {
    return request.delete<any, null>(`/admin/hosp/hospitalSet/remove/${id}`)
}

// 批量删除,请求体的类型是React.Key[]不用再单独封装
/**
 * 
 * @param ids id 的数组
 * @returns null
 */
export const removeBatch = (ids: React.Key[]) => {
    return request.delete<any, null>('/admin/hosp/hospitalSet/batchRemove', {
        data: ids
    })
}
/**
 * 根据id获取医院设置数据
 * @param id 
 * @returns Promise<IHospitalSetData>
 */
export const getHospitalSetById = (id: string) => {
    return request.get<any, IHospitalSetData>('/admin/hosp/hospitalSet/get/' + id)
}

/**
 * 更新医院设置
 * @param data 
 * @returns null
 */
export const updateHospitalSet = (data: IHospitalSetUpdateData) => {
    return request.put<any, null>('/admin/hosp/hospitalSet/update', data)
}
