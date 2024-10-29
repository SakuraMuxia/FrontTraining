// 引入路由器对象:需要在这里路由鉴权(全局守卫)
import router from '@/router'
// 引入进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 控制进度条loading效果
NProgress.configure({ showSpinner: false });
// 引入pinia仓库:token
import pinia from '@/stores'
// 引入用户相关的小仓库
import { useUserInfoStore } from '@/stores/userInfo'
const userInfoStore = useUserInfoStore(pinia)
// 消息提示
import { ElMessage } from 'element-plus'
// 引入获取标题的函数
import getPageTitle from './utils/get-page-title'

// 不用进行token检查的白名单路径数组
const whiteList = ['/login']

// 路由加载前
router.beforeEach(async (to, from, next) => {
  // 在显示进度条
  NProgress.start()

  // 设置整个页面的标题
  document.title = getPageTitle(to.meta.title as string)
  // 获取userInfoStore小仓库中的token
  const token = userInfoStore.token
  // 如果token存在(已经登陆或前面登陆过)
  if (token) {
    // 如果请求的是登陆路由
    if (to.path === '/login') {
      // 直接跳转到根路由, 并完成进度条
      next({ path: '/' })
      NProgress.done()
    } else { // 请求的不是登陆路由
      // 是否有用户信息:用户名是否存在
      const hasLogin = !!userInfoStore.name
      if (hasLogin) { // 内存中(pinia)有用户信息=>已经登陆
        next()
      } else { // 内存中没有用户信息(没有登陆或刷新了页面)
        try {
          // 发送请求获取用户信息
          // 每次刷新pinia数据清空,重新发送请求获取用户信息
          await userInfoStore.getInfo()
          next(to) // 放行
          NProgress.done() // 结束进度条

        } catch (error: any) { // 获取不到用户信息:(原因:token过期了或其他)
          // 重置用户信息
          await userInfoStore.reset()
          // 提示错误信息
          // ElMessage.error(error.message || 'Has Error') // axios拦截器中已经有提示了
          // 跳转到登陆页面, 并携带原本要跳转的路由路径, 用于登陆成功后跳转
          next(`/login?redirect=${to.path}`)
          // 完成进度条
          NProgress.done()
        }
      }
    }
  } else { // 没有token
    // 如果目标路径在白名单中(是不需要token的路径)
    if (whiteList.indexOf(to.path) !== -1) {
      // 放行
      next()
    } else {
      // 如果没在白名单中, 跳转到登陆路由携带原目标路径
      next(`/login?redirect=${to.path}`)
      // 完成进度条  当次跳转中断了, 要进行一个新的跳转了
      NProgress.done()
    }
  }
})

// 路由加载后
router.afterEach(() => {
	NProgress.done();
})
