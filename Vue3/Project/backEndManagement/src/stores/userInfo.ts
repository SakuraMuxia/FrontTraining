// 引入定义小仓库方法
import { defineStore } from 'pinia';
// 本地存储操作token
import { getToken, removeToken, setToken } from '../utils/token-utils';
// state类型的数据类型
import type { UserInfoState } from './interface';
// 消息提示
import { ElMessage } from 'element-plus'
// 静态路由
import { staticRoutes } from '@/router/routes'
// 导入用户相关的API
import { getUserInfo, reqUserLogin, reqUserlogout } from '@/api/user';
// 引入类型
import type {LoginResponseData, UserInfoResponseData} from '@/api/user/type/index'
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

  state: (): UserInfoState => ({
    token: getToken() as string,
    name: '',
    avatar: '',
    menuRoutes: []
  }),

  actions: {
    // 登陆
    async login(username: string, password: string) {
      // 定义请求体
      const data = {
        username,
        password
      }
      // 获取响应数据
      const result:LoginResponseData = await reqUserLogin(data)
      // 存储token数据(pinia)
      this.token = result.token
      // 存储token数据(localstore)
      setToken(result.token)
      
    },
    // 获取用户信息(路由鉴权那里进行调用)
    async getInfo() {
      const result:UserInfoResponseData = await getUserInfo()
      // console.log("result ",result)
      // 设置小仓库中的数据状态
      this.name = result.name
      this.avatar = result.avatar
      // 设置用户的路由
      this.menuRoutes = staticRoutes
    },
    // 退出登陆
    async reset() {
      // 发送请求
      await reqUserlogout()
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
    },
  },
});
