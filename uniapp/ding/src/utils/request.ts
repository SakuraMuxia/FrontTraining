import qs from 'qs';
class Service {
    //原型对象的方法
    API(options: any): any {
		var queryString = '';
		// 解构
		const {params = {}, data = {}, header = {} } = options;
		
        // 定义全局基础路由
        const baseURL = 'http://127.0.0.1:3000';
		
        // 加载效果开启
        // uni.showLoading({
        //     title: '加载中...'
        // })

        // 判断用户是否登录:如有token携带
        const token = uni.getStorageSync('TOKEN');
		
        // 定义请求头
		header['Content-Type'] = 'application/json;charset=UTF-8'
        
        // 如果token存在,则携带请求头
        if (token) {
            header.token = token;
        }
		
		// 如果存在 params
		if(params){
			// 序列化params
			queryString = '?' + qs.stringify(params)
		}else{
			queryString = ''
		}
		
        // 返回一个promise对象
        return new Promise((resolve, reject) => {
            // uni-app 提供的API进行网络发请求
            uni.request({
                url: baseURL + options.url + queryString,// 请求的地址
                method: options.method || 'GET',// 请求方式
                data: options.data || {},// 携带的参数
                header, // 请求头
                success(res) {// 请求成功的回调
                    resolve(res.data); // 返回一个成功的Promise对象,同时简化数据
                },
                fail(error) { // 请求失败的回调
                    reject(error);
                },
                complete() { // 成功失败都执行
                    uni.hideLoading(); // 隐藏加载动画
                }
            })
        })
    }
    // get请求方法
    get(options: any) {
        options.method = "GET";
        return this.API(options);
    }
    // post请求方法
    post(options: any) {
        options.method = "POST";
        return this.API(options);
    }
    // delete 请求方法
    delete(options: any) {
        options.method = "DELETE";
        return this.API(options);
    }
}
// 暴漏数据
export default Service;