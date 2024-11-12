import request from '@/utils/request';
import type { PermissionListResponseModel, PermissionModel } from './type/permission';

// 定义请求地址的枚举
enum Api {
    GetPermissionList = '/admin/acl/permission', // 获取权限列表数据
    RemovePermission = '/admin/acl/permission/remove', // 移除
    SavePermission = '/admin/acl/permission/save', // 添加
    UpdatePermission = '/admin/acl/permission/update', // 更新
}


/**
 * 获取权限列表
 * @returns PermissionListResponseModel
 */
export const getPermissionListApi = () => {
    return request.get<any, PermissionListResponseModel>(Api.GetPermissionList);
  };
  
  /**
   * 删除权限
   * @param id 权限id
   * @returns null
   */
  export const removePermissionApi = (id: string) => {
    return request.delete<any, null>(Api.RemovePermission + `/${id}`);
  };
  
  /**
   * 添加或更新权限
   * @param permission 权限对象 
   * @returns null
   */
  export const saveOrUpdatePermissionApi = (permission: PermissionModel) => {
    return request.put<any, null>(permission.id ? Api.UpdatePermission : Api.SavePermission, permission);
  };
  