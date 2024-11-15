// 品牌item对象类型
export interface TradeMark{
    id?:number,
    tmName:string,
    logoUrl:string
}
// 品牌数组
export type Records = TradeMark[]

// 品牌列表响应类型
export interface TradeMarkResponseData{
    records:Records,
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number
}
