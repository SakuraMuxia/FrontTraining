import type { RouteRecordRaw } from 'vue-router';
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */

// 一级路由 404 login / 二级路由 /home
 export const staticRoutes: Array<RouteRecordRaw> = [
	{
    // 路径全是小写的
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    // 路由元数据
    meta: {
      hidden: true
    }
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  },

  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { 
        title: '首页', 
        icon: 'ele-HomeFilled', 
      }
    }]
  },
  // 商品管理模块,一级路由
  {
    path: '/product', // 一级路由展示 layout组件
    component: () => import('@/layout/index.vue'),
    name:'Product',
    meta:{
      title:'商品管理',
      icon:'ele-Goods'
    },
    children:[
      {
        path:'trademark',
        component:()=>import('@/views/product/trademark/index.vue'),
        name:'Trademark',
        meta:{
          title:'品牌管理',
          icon:'ele-Apple'
        }
      },
      {
        path:'attr',
        component:()=>import('@/views/product/attr/index.vue'),
        name:'Attr',
        meta:{
          title:'属性管理',
          icon:'ele-IceTea'
        }
      },
      {
        path:'spu',
        component:()=>import('@/views/product/spu/index.vue'),
        name:'Spu',
        meta:{
          title:'SPU管理',
          icon:'ele-Burger'
        }
      },
      {
        path:'sku',
        component:()=>import('@/views/product/sku/index.vue'),
        name:'Sku',
        meta:{
          title:'SKU管理',
          icon:'ele-Goblet'
        }
      }
    ]
  },

  /* 匹配任意的路由 必须最后注册 */
  { 
    path: '/:pathMatch(.*)', 
    name: 'Any',
    redirect: '/404', 
    meta: {
      hidden: true 
    }
  }
];


/**
 * 定义动态路由
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [];
