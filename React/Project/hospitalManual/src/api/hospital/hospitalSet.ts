import { request } from '@utils/http'
import { IHospitalSetListResponse } from './model/hospitalSetType'

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

