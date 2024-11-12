/********角色*********/

export interface Role{
    id?: string; // id
    roleName: string; // 角色名字
    originRoleName?: string // 页面是否需要的标识
    edit?: boolean // 是否可进行编译
}
// 角色列表
export type AllRolesArr = Role[]

// 角色分页
export interface RolePageResponseData{
    items: AllRolesArr
    total: number
}

// 某个用户的角色列表
export interface UserRolesArr{
    // 所有角色列表
    allRolesList: AllRolesArr;
    // 分配的角色列表
    assignRoles: AllRolesArr;
}
