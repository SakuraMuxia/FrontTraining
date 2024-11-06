//SPU管理模块的接口
import request from '@/utils/request';
import type {ImageArr, SaleAttrArr, SaleAttrNameArr, SpuListResponseData, SpuObj, TradeMarkArr} from '@/api/product/type/spu'


enum API {
    //获取全部已有SPU列表数据
    GETSPULIST_URL = "/admin/product/",
    //获取全部品牌的接口地址
    GETALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
    //获取某一个SPU的照片墙的数据
    GETIMAGELIST_URL = "/admin/product/spuImageList/",
    //获取某一个已有SPU销售属性与属性值
    GETSALEATTR_URL = "/admin/product/spuSaleAttrList/",
    //获取全部的销售属性:颜色、版本、尺码
    GETBASESALE_URL = "/admin/product/baseSaleAttrList",
    //添加新的SPU接口
    ADDSPU_URL = "/admin/product/saveSpuInfo",
    //更新已有的SPU接口
    UPDATESPU_URL = "/admin/product/updateSpuInfo",
    //删除已有的SPU
    DELETESPU_URL="/admin/product/deleteSpu/"
}

// 获取SPU列表数据
export const reqSpuList = (page:number,limit:number,category3Id:number|string) => {
    return request.get<any,SpuListResponseData>(API.GETSPULIST_URL + `${page}/${limit}?category3Id=${category3Id}`)
}
//获取全部的品牌接口
export const reqAllTradeMark = () => {
    return request.get<any, TradeMarkArr>(API.GETALLTRADEMARK_URL);
}
//获取某一个SPU的照片墙的数据
export const reqImageList = (spuId: number) => {
    return request.get<any, ImageArr>(API.GETIMAGELIST_URL + spuId);
}
// 获取Spu已有销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
    return request.get<any, SaleAttrArr>(API.GETSALEATTR_URL + spuId);
}
// 获取Spu销售属性名称
export const reqBaseSale = () => {
    return request.get<any, SaleAttrNameArr>(API.GETBASESALE_URL);
}
//添加与更新已有的SPU接口
export const reqAddOrUpdateSpu = (data: SpuObj) => {
    if (data.id) {
        //更新
        return request.post(API.UPDATESPU_URL, data);
    } else {
        //添加
        return request.post(API.ADDSPU_URL, data);
    }
}