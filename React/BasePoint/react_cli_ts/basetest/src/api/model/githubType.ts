/**
 * 定义 github.ts 中定义的请求api函数，需要的类型
 */

/**
 * 用户对象类型
 */
export interface IUserItem {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
/**
 * 用户列表数组类型
 */
export type IUserList = IUserItem[]
/**
 * 获取用户列表响应结果类型
 */
export interface IUsersResponse {
    items: IUserList
}