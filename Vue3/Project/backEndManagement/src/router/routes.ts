import type { RouteRecordRaw } from 'vue-router';

//静态路由:常量路由
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
	
	{
		path: '/product', // 一级路由展示 layout组件
		component: () => import('@/layout/index.vue'),
		name: 'Product',
		meta: {
			title: '商品管理',
			icon: 'ele-Goods'
		},
		children: [
			{
				path: 'trademark',
				component: () => import('@/views/product/trademark/index.vue'),
				name: 'Trademark',
				meta: {
					title: '品牌管理',
					icon: 'ele-Apple'
				}
			},
			{
				path: 'attr',
				component: () => import('@/views/product/attr/index.vue'),
				name: 'Attr',
				meta: {
					title: '属性管理',
					icon: 'ele-IceTea'
				}
			},
			{
				path: 'spu',
				component: () => import('@/views/product/spu/index.vue'),
				name: 'Spu',
				meta: {
					title: 'SPU管理',
					icon: 'ele-Burger'
				}
			},
			{
				path: 'sku',
				component: () => import('@/views/product/sku/index.vue'),
				name: 'Sku',
				meta: {
					title: 'SKU管理',
					icon: 'ele-Goblet'
				}
			}
		]
	},

	// 权限管理 一级路由
	{
		name: 'Acl',
		path: '/acl',
		component: () => import('@/layout/index.vue'),
		redirect: '/acl/user/list',
		meta: { title: '权限管理', icon: 'ele-Setting' },
		children: [
			{
				path: '/acl/user/list',
				name: 'User',
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
				name: 'Menu',
				path: '/acl/menu/list',
				component: () => import('@/views/acl/menu/index.vue'),
				meta: {
					title: '菜单管理',
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

// // 定义动态路由
// export const asyncRoutes: Array<RouteRecordRaw> = [
// 	// 商品管理模块 一级路由
// 	{
// 		path: '/product', // 一级路由展示 layout组件
// 		component: () => import('@/layout/index.vue'),
// 		name: 'Product',
// 		meta: {
// 			title: '商品管理',
// 			icon: 'ele-Goods'
// 		},
// 		children: [
// 			{
// 				path: 'trademark',
// 				component: () => import('@/views/product/trademark/index.vue'),
// 				name: 'Trademark',
// 				meta: {
// 					title: '品牌管理',
// 					icon: 'ele-Apple'
// 				}
// 			},
// 			{
// 				path: 'attr',
// 				component: () => import('@/views/product/attr/index.vue'),
// 				name: 'Attr',
// 				meta: {
// 					title: '属性管理',
// 					icon: 'ele-IceTea'
// 				}
// 			},
// 			{
// 				path: 'spu',
// 				component: () => import('@/views/product/spu/index.vue'),
// 				name: 'Spu',
// 				meta: {
// 					title: 'SPU管理',
// 					icon: 'ele-Burger'
// 				}
// 			},
// 			{
// 				path: 'sku',
// 				component: () => import('@/views/product/sku/index.vue'),
// 				name: 'Sku',
// 				meta: {
// 					title: 'SKU管理',
// 					icon: 'ele-Goblet'
// 				}
// 			}
// 		]
// 	},

// 	// 权限管理 一级路由
// 	{
// 		name: 'Acl',
// 		path: '/acl',
// 		component: () => import('@/layout/index.vue'),
// 		redirect: '/acl/user/list',
// 		meta: { title: '权限管理', icon: 'ele-Setting' },
// 		children: [
// 			{
// 				name: 'User',
// 				path: '/acl/user/list',
// 				component: () => import('@/views/acl/user/index.vue'),
// 				meta: { title: '用户管理' }
// 			},
// 			{
// 				name: 'Role',
// 				path: '/acl/role/list',
// 				component: () => import('@/views/acl/role/index.vue'),
// 				meta: {
// 				title: '角色管理',
// 				},
// 			},
// 			{
// 				name: 'RoleAuth',
// 				path: '/acl/role/auth',
// 				component: () => import('@/views/acl/role/roleAuth.vue'),
// 				meta: {
// 				title: '角色管理',
// 				hidden: true,
// 				activeMenu: '/acl/role/list',
// 				},
// 			},
// 			{
// 				name: 'Permission',
// 				path: '/acl/permission/list',
// 				component: () => import('@/views/acl/permission/index.vue'),
// 				meta: {
// 				title: '菜单管理',
// 				}
// 			}
// 		]
// 	},
// ];

// // 任意路由
// export const anyRoute = [
// 	/* 匹配任意的路由 必须最后注册 */
// 	{
// 		path: '/:pathMatch(.*)',
// 		name: 'Any',
// 		redirect: '/404',
// 		meta: {
// 			hidden: true
// 		}
// 	}
// ]