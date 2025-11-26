// 获取token
// import { getToken } from "@/utils/system";

// 定义需要拦截的路由跳转方法
const methodsToIntercept = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

// navigate拦截器
const navigateToInterceptor = (args:any) => {
	const WHITE_LIST = ['/pages/login/login','/pages/register/register']; // 定义白名单页面
	// 获取目标页面的路径
	const url = args.url.split('?')[0];
	// console.log('url',url)
	// 如果目标页面在白名单中，则直接放行
	if (WHITE_LIST.includes(url)) {
		return args;
	}

	// 获取token
	// const token = getToken();

	// if (!token) {
	// 	// 如果没有 Token，提示用户并跳转到登录页面
	// 	uni.showToast({ title: '请先登录', icon: 'none' });
	// 	uni.navigateTo({ url: '/pages/login/login' });
	// 	return false; // 阻止原始跳转
	// }

	// Token 有效，允许跳转
	return args;
}

export const routeInterceptor = {
	install() {
		methodsToIntercept.forEach((method) => {
			uni.addInterceptor(method, {
				invoke: navigateToInterceptor,
			});
		});
	},
}