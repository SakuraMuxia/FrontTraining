import request from '@/utils/request'
import type { TradeMarkResponseData,TradeMark } from './type/trademark'

// 枚举地址
enum API {
    //获取已有的品牌
    GETTRADEMARK_URL = '/admin/product/baseTrademark/',
    //添加新增的品牌接口:post  {tmName:'xxx',logoUrl:'xxx'}
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
    //更新已有的品牌  post  {id:'zzz',tmName:'xxx',logoUrl:'xxx'}
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
    //删除已有的品牌数据
    DLETETRADENARK_URL = "/admin/product/baseTrademark/remove/"

}

// 获取品牌列表数据 
export const reqTradeMark = (page:number,limit:number) => request.get<any,TradeMarkResponseData>(API.GETTRADEMARK_URL+`${page}/${limit}`)

//添加与更新品牌
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
    //更新已有的品牌
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
    } else {
        //新增品牌
        return request.post<any, any>(API.ADDTRADEMARK_URL, data);
    }
}
// 删除品牌的接口
export const reqDeleteById = (id: number) => request.delete<any, any>(API.DLETETRADENARK_URL + id);