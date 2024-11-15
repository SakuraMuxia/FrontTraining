// 引入 createRouter 用于创建路由器的方法 router,一个路由器可以管理多个路由对象
// 引入 createWebHistory 用于创建History模式
// 引入 createWebHashHistory 用于创建Hash模式
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
// 引入静态路由
import { staticRoutes } from '@/router/routes';
// 创建路由器
const router = createRouter({
  // 设置路由模式
  history: createWebHistory(),
  // 路由对象 staticRoutes 是一个数组 
  routes: staticRoutes,
  // 滚动行为
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

// 导出路由
export default router;