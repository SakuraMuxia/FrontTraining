import request from '@/utils/request'
import type { LoginParams,LoginResponseData, UserInfoResponseData } from './type'

// 接口地址:枚举enum
enum API{
    // 登陆URL
    LOGIN_URL = "/admin/acl/index/login",
    // 用户信息
    USERINFO_URL = "/admin/acl/index/info",
    // 退出登陆
    USERLOGOUT_URL = "/admin/acl/index/logout"
}

// api接口
// 登陆
export const reqUserLogin = (data:LoginParams)=>request.post<any,LoginResponseData>(API.LOGIN_URL,data)

// 获取用户信息
export const getUserInfo = ()=>request.get<any,UserInfoResponseData>(API.USERINFO_URL)

// 退出登陆
export const reqUserlogout = () => {
    return request.post<any,any>(API.USERLOGOUT_URL)
}