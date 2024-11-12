import request from '@/utils/request';
import type { Role, RolePageResponseData } from './type/role';

// 定义请求地址的枚举
enum Api {
    GetRoleList = '/admin/acl/role', // 获取角色列表数据
    RemoveRole = '/admin/acl/role/remove', // 移除角色
    RemoveRoles = '/admin/acl/role/batchRemove', // 批量移除角色
    SaveRole = '/admin/acl/role/save', // 保存角色
    UpdateRole = '/admin/acl/role/update', // 删除角色
    AssignRole = '/admin/acl/permission/doAssign', // 授权角色
    GetAssignRole = '/admin/acl/permission/toAssign', // 获取角色列表
}

// 获取角色分页列表(带搜索)
export const getRoleListApi = (page: number, limit: number, roleName: string) => {
    return request.get<any, RolePageResponseData>(Api.GetRoleList + `/${page}/${limit}`, {
        params: {
            roleName
        }
    })
}

/**
 * 保存一个新角色
 * @param role 角色对象
 * @returns null
 */
export const saveRoleApi = (role: Role) => {
    return request.post<any, null>(Api.SaveRole, role);
}

/**
 * 获取一个角色的所有权限列表
 * @param roleId 角色id
 * @returns PermissionModel
 */
export const getAssignRoleApi = (roleId: string) => {
    return request.get<any, any>( Api.GetAssignRole + `/${roleId}`);
};


/**
 * 给某个角色授权
 * @param roleId 角色ID
 * @param permissionId 多个权限id组成的字符串  2,3,4
 * @returns null
 */
export const assignRoleApi = (roleId: string, permissionId: string) => {
    return request.post<any, null>(Api.AssignRole, null, {
        params: {
            roleId,
            permissionId
        },
    });
};

/**
 * 更新一个角色
 * @param role 角色对象
 * @returns null
 */
export const updateRoleApi = (role: Role) => {
    return request.put<any, null>( Api.UpdateRole, role);
};

/**
 * 删除某个角色
 * @param id 角色id
 * @returns null
 */
export const removeRoleApi = (id: string) => {
    return request.delete<any, null>( Api.RemoveRole + `/${id}`);
};

/**
 * 批量删除多个角色
 * @param ids 角色id的数组
 * @returns null
 */
export const removeRolesApi = (ids: string[]) => {
    return request.delete<any, null>(Api.RemoveRoles, {
        data: ids
    })
}