/*******************************************************************/

//登录接口需要携带请求体参数-对象
export interface loginData {
    username: string,
    password: string
}
//登录接口返回值的类型
export interface loginResponseData {
    token: string
}
//用户信息接口返回数据类型
export interface userInfoResponseData {
    name:string,
    avatar:string,
    roles:string[],
    buttons:string[],
    routes:string[]
}

/*******************************************************************/
export interface UserObj {
    id?: string; // 用户id
    roleName?: string[]; // 用户的角色数组名字
    username: string; // 用户名字
    nickName: string; // 昵称
    password: string; // 密码
}
  
// 管理员用户列表
export type UserArr = UserObj[];
  
// 管理员用户分页列表
export interface UserPageArr {
    items: UserArr; // 用户列表数据
    total: number; // 总条数
}

/*******************************************************************/