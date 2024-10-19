/**
 * 医院设置每一项对象类型
 */
export interface IHospitalSetItem {
    id: number;
    createTime: string;
    hosname: string;
    hoscode: string;
    apiUrl: string;
    signKey: string;
    contactsName: string;
    contactsPhone: string;
    status: number
}
/**
 * 医院设置列表类型
 */
export type IHospitalSetList = IHospitalSetItem[]
/**
 * 医院设置分页 响应数据类型
 */
export interface IHospitalSetListResponse {
    records: IHospitalSetList;
    total: number;
}

// 添加医院 请求体类型
export interface IHospitalSetData{
    apiUrl: string;
    contactsName: string;
    contactsPhone: string;
    hoscode: string;
    hosname: string;
}

// 更新医院 请求体类型
export interface IHospitalSetUpdateData extends IHospitalSetData {
    id: string;
}