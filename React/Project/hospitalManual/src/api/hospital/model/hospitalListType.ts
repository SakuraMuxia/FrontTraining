/**
 * 省市区 返回数据 对象类型
 */
export interface IDistrictItem {
    id: number;
    createTime: string;
    updateTime: string;
    name: string;
    value: string;
    hasChildren: boolean;
}

// 省市区列表接口的返回值类型
export type IDistrictList = IDistrictItem[]

// 医院列表每一项类型
export interface IHospitalItem {
   id: string;
   createTime: string; // 创建时间
   param: {
       hostypeString: string; // 医院等级
       fullAddress: string; // 医院地址
   },
   hoscode: string; // 医院编号
   hosname: string; // 医院名
   hostype: string; // 医院类型
   provinceCode: string; // 省
   cityCode: string; // 市
   districtCode: string; // 区
   address: string; // 地址
   logoData: string; // 医院logo base64URL
   route: string;  //乘车路线
   status: number; // 医院状态
   intro: string | null; // 联合类型
   bookingRule: IBookingRule|null
}

// 医院预约类型
export interface IBookingRule {
    cycle: number; // 预约周期
    releaseTime: string; // 放号时间
    stopTime: string;// 停止挂号时间
    quitDay: number; // 就诊结束日期
    quitTime: string; // 结束时间
    rule: string[]; //取号规则
}

// 医院列表类型
export type IHospitalList = IHospitalItem[]

/**
 *  请求医院列表响应对象类型
 */
export interface IHospitalListResponse {
    content:IHospitalList;
    totalElements:number;
}

/**
 * 医院列表参数类型
 */
export interface IFormFields{
    hoscode?: string;
    hosname?: string;
    hostype?: string;
    provinceCode?: string;
    cityCode?: string;
    districtCode?: string;
    status?: number;
}
export interface IHospitalListParams extends IFormFields{
    page: number;
    limit: number;
}

// 医院详情类型返回值类型
export interface IHospitalDetail{
    bookingRule:IBookingRule
    hospital:IHospitalItem
}

// 医院排班响应体类型
export interface IDepartmentItem {
    depcode: string;
    depname: string;
    children: IDepartmentList | null;
    disabled?:boolean;
}
//科室列表类型
export type IDepartmentList = IDepartmentItem[];