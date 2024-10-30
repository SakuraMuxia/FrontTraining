import request from '@/utils/request'
import type { TradeMarkResponseData } from './type/trademark'

// 枚举地址
enum API {
    GETTRADEMARK_URL = '/admin/product/baseTrademark/'
}

// 获取品牌列表数据 
export const reqTradeMark = (page:number,limit:number) => request.get<any,TradeMarkResponseData>(API.GETTRADEMARK_URL+`${page}/${limit}`)
