// 引入定义小仓库方法
import { defineStore } from 'pinia';
// 本地存储操作token
import { getToken, removeToken, setToken } from '../utils/token-utils';
// state类型的数据类型
import type { UserInfoState } from './interface';
// 消息提示
import { ElMessage } from 'element-plus'
//引入常量路由、异步路由、任意路由
import { staticRoutes, asyncRoute, anyRoute } from '@/router/routes'
// 导入用户相关的API
import { getUserInfo, reqUserLogin, reqUserlogout } from '@/api/user';
// 引入类型
import type {LoginResponseData, UserInfoResponseData} from '@/api/user/type/index'

//引入路由器
import router from '@/router';
//引入lodash深拷贝
import cloneDeep from "lodash/cloneDeep";

//过滤异步路由
/**
 * 
 * @param asyncRoute 所有异步路由
 * @param routes 用户信息中包含的路由数组
 * @returns 返回一个路由配置对象
 */
function findUserAsyncRoute(asyncRoute: any, routes: any) { // 返回一个路由配置对象
  // 遍历异步路由
  return asyncRoute.filter((route: any) => {
    // 如果用户路由数组中包含
    if (routes.includes(route.name)) {
      // 存在children属性,并children属性长度大于0
      if (route.children && route.children.length > 0) {
        // 递归调用 把递归的结果(二级路由)返回给当前对象的 children属性(二级路由)
        // 这行语句 会 修改原数组asyncRoute中的数据
        route.children = findUserAsyncRoute(route.children, routes);
      }
      // 返回为真
      return true;
    }
  })
}

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

  state: (): UserInfoState => {
    return {
      token: getToken() as string,
      name: '',
      avatar: '',
      menuRoutes: [],
      buttons:[]
    }
  },

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
      //存储当前用户拥有哪些按钮权限标识 ['btn.模块的名字.xxxx']
      this.buttons = result.buttons;
      //过滤出这个用户需要展示异步路由 在这里使用深拷贝,传入一个备份就不会影响原数组
      const userAsyncRoute = findUserAsyncRoute(cloneDeep(asyncRoute), result.routes);
      //左侧菜单展示:决定左侧菜单(导航)显示与否
      //router注册路由只有静态路由 
      this.menuRoutes = [...staticRoutes,...userAsyncRoute,anyRoute];
      //动态追加路由:异步路由、任意路由即可！！！ router.getRoutes获取路由器全部的路由！！！
      [...userAsyncRoute,anyRoute].forEach((route:any)=>{
          // 动态追加路由
          router.addRoute(route);
      })
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
      //清空当前用户全部的路由
      router.getRoutes().forEach((route:any)=>{
        //退出登录清空全部路由
        router.removeRoute(route.name);
      });
      //退出登录保留全部的常量路由
      staticRoutes.forEach((route:any)=>{
          router.addRoute(route);
      })
    },
  },
});
