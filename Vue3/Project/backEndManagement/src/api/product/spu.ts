//SPU管理模块的接口
import request from '@/utils/request';
import type {SpuListResponseData} from '@/api/product/type/spu'


enum API {
    //获取全部已有SPU列表数据
    GETSPULIST_URL = "/admin/product/",
}

// 获取SPU列表数据
export const reqSpuList = (page:number,limit:number,category3Id:number|string) => {
    return request.get<any,SpuListResponseData>(API.GETSPULIST_URL + `${page}/${limit}?category3Id=${category3Id}`)
}