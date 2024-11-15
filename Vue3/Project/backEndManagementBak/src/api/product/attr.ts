import request from '@/utils/request';
import type { AttrResponseData, Attr } from './type/attr';

//枚举地址
enum API {
    //获取平台属性与属性值GET:需要携带三个参数 1|2|3分类的ID
    GETATTR_URL="/admin/product/attrInfoList/",
    //添加新的属性|更新已有属性
    ADDORUPDATEATTR_URL="/admin/product/saveAttrInfo",
    //删除已有的属性接口
    DELETEATTR_URL="/admin/product/deleteAttr/"
}

//获取平台属性与属性值
export const reqAttrList = (c1Id:number|string,c2Id:number|string,c3Id:number|string)=>{
    return request.get<any,AttrResponseData>(API.GETATTR_URL+`${c1Id}/${c2Id}/${c3Id}`)
}

//添加属性与更新属性接口
export const reqAddOrUpdateAttr = (data:Attr)=>request.post<any,any>(API.ADDORUPDATEATTR_URL,data);

//删除已有的属性
export const reqDeleteAttr = (attrId:number)=>request.delete<any,any>(API.DELETEATTR_URL+attrId);
