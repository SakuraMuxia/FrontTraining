//用户相关的接口函数放在这里
import request from '@/utils/request';

//ts枚举
enum API {
    LOGIN="admin/acl/index/login",//登录接口
    USERINFO="/admin/acl/index/info",//获取用户信息
    LOGOUT="/admin/acl/index/logout",//退出登录接口
}

// 登陆接口
// admin/acl/index/login  POST请求   参数:{username:'',password:''}
export const reqLogin = (data:any)=>request.post(API.LOGIN,data)

//获取用户信息:用户名字、头像.....
export const reqUserInfo = ()=>request.get(API.USERINFO)

//退出登录
export const reqLogout = ()=>request.post(API.LOGOUT)

