import request from '@/utils/request'
import type { UserObj, UserPageArr } from './type/user'
import type { UserRolesArr } from './type/role'

// 定义请求地址的枚举
enum Api {
    GetUserList = '/admin/acl/user', // 获取用户列表的接口地址
    RemoveUser = '/admin/acl/user/remove', // 移除用户的接口地址
    RemoveUsers = '/admin/acl/user/batchRemove', // 批量移除用户的接口地址
    SaveUser = '/admin/acl/user/save', // 保存用户的接口地址
    UpdateUser = '/admin/acl/user/update', // 更新用户的接口地址
    GetUserRoleList = '/admin/acl/user/toAssign', // 获取用户角色列表的接口地址
    AssignUserRoleList = '/admin/acl/user/doAssign', // 设置用户角色的接口地址
}

// 获取用户列表
export const getUserListApi = (page: number, limit: number, searchParams: object) => {
    return request.get<any, UserPageArr>(Api.GetUserList + `/${page}/${limit}`, {
        params: searchParams
    })
}

// 编辑和添加用户
export const saveOrUpdateUserApi = (user: UserObj) => {
    if (user.id) {
        return request.put<any, null>(Api.UpdateUser, user);
    }else{
        return request.post<any, null>(Api.SaveUser, user);
    }
}

// 删除用户(单个)
export const removeUserApi = (id: string) => {
    return request.delete<any, null>(Api.RemoveUser + `/${id}`);
};

// 删除用户(批量)
export const removeUsersApi = (ids: string[]) => {
    return request.delete<any, null>(Api.RemoveUsers, {
        data: ids
    })
}

// 获取用户角色
export const getUserRoleListApi = (userId: string) => {
    return request.get<any, UserRolesArr>(Api.GetUserRoleList + `/${userId}`);
};
  
/**
 * 给用户分配角色
 * @param userId 用户id
 * @param roleId 包含所有角色id的字符串 3,5,6
 * @returns 
 */
export const assignUserRoleListApi = (userId: string, roleId: string) => {
    return request.post<any, void>(Api.AssignUserRoleList, null, {
        params: {
            userId,
            roleId
        }
    });
};