// 登陆接口 参数类型
export interface LoginParams {
    password: string,
    username: string
}
// 登陆接口 响应类型
export interface LoginResponseData{
    token: string
}
// 用户信息 响应类型
export interface UserInfoResponseData{
    name:string,
    avatar:string,
    roles:string[],
    routes:string[],
    buttons:string[]
}