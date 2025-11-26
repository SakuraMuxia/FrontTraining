// import { useUserInfoStore } from '@/store/user';

// request拦截器
export const requestInterceptor = () => {
	// const userInfoStore = useUserInfoStore();
	// 添加请求和响应拦截器
	uni.addInterceptor('request', {
		invoke(args) {
			// 请求前的处理，如添加 token
			// const token = uni.getStorageSync('TOKEN');
			// if (token) {
			// 	args.header = {
			// 		...args.header,
			// 		Authorization: `Bearer ${token}`,
			// 	};
			// }
			console.log("请求拦截:",args)
			return args;
		},
		success(response) {
			// 响应后的处理，如统一处理错误码
			console.log("响应拦截:",response)
			if (response.data.code === 401) {
				// uni.showToast({
				// 	title: '登录已过期，请重新登录',
				// 	icon: 'none',
				// });
				// // 可以跳转到登录页面
				// uni.redirectTo({ url: '/pages/login/login' });
				// 自动重新登陆
				// if(userInfoStore.username && userInfoStore.passwd){
				// 	userInfoStore.silentLogin()
				// }
			}
			return response;
		},
		fail(err) {
			// 请求失败的处理
			uni.showToast({
				title: '请求失败，请检查网络',
				icon: 'none',
			});
			console.warn('err',err)
			return Promise.reject(err);
		},
	});
}

