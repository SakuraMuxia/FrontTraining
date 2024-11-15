import type { RouteRecordRaw } from 'vue-router';

//静态路由:常量路由
export const staticRoutes: Array<RouteRecordRaw> = [
	//登录
	{
		path: '/login',
		component: () => import('@/views/login/index.vue'),
		name: 'Login',
		meta: {
			//hidden:决定当前路由是否在左侧菜单展示 true:隐藏 false:显示
			//title:决定路由在左侧展示标题
			//icon:左侧菜单文字前面的图标
			hidden: true,
		}
	},
	//404 
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/error/404.vue'),
		meta: {
			hidden: true
		}
	},
	// 首页
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
];

//存储异步路由
export const asyncRoute = [
	// 权限管理
	{
		name: 'Acl',
		path: '/acl',
		component: () => import('@/layout/index.vue'),
		redirect: '/acl/user/list',
		meta: { title: '权限管理', icon: 'ele-Setting' },
		children: [
			{
				name: 'User',
				path: '/acl/user/list',
				component: () => import('@/views/acl/user/index.vue'),
				meta: { title: '用户管理' }
			},
			{
				name: 'Role',
				path: '/acl/role/list',
				component: () => import('@/views/acl/role/index.vue'),
				meta: {
					title: '角色管理',
				},
			},
			{
				name: 'RoleAuth',
				path: '/acl/role/auth',
				component: () => import('@/views/acl/role/roleAuth.vue'),
				meta: {
					title: '角色管理',
					hidden: true,
					activeMenu: '/acl/role/list',
				},
			},
			{
				name: 'Permission',
				path: '/acl/permission/list',
				component: () => import('@/views/acl/menu/index.vue'),
				meta: {
					title: '菜单管理',
				}
			}
		]
	},
	//商品管理模块的路由
	{
		path: '/product',
		component: () => import('@/layout/index.vue'),
		name: 'Product',
		meta: {
			title: '商品管理',//菜单的标题
			icon: "ele-Goods"
		},
		children: [
			{
				path: 'trademark',
				component: () => import('@/views/product/trademark/index.vue'),
				name: 'Trademark',
				meta: {
					title: '品牌管理',
					icon: 'ele-Operation'
				}
			},
			{
				path: 'attr',
				component: () => import('@/views/product/attr/index.vue'),
				name: 'Attr',
				meta: {
					title: '属性管理',
					icon: 'ele-Files'
				}
			},
			{
				path: 'spu',
				component: () => import('@/views/product/spu/index.vue'),
				name: 'Spu',
				meta: {
					title: 'Spu管理',
					icon: 'ele-Platform'
				}
			}
			,
			{
				path: 'sku',
				component: () => import('@/views/product/sku/index.vue'),
				name: 'Sku',
				meta: {
					title: 'sku管理',
					icon: 'ele-Football'
				}
			}

		]

	}
]


//存储任意路由
export const anyRoute = {
	path: '/:pathMatch(.*)',
	name: 'Any',
	redirect: '/404',
	meta: {
		hidden: true
	}
}