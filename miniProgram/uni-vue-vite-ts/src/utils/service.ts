//ES6类
class Service {
    //原型对象的方法
    API(params: any): any {
        // 定义全局基础路由
        const baseURL = 'https://gmall-prod.atguigu.cn/skb';
        //加载效果开启
        uni.showLoading({
            title: '加载中....'
        })

        //判断用户是否登录:如有token携带
        const token = uni.getStorageSync('TOKEN');
        // 定义请求头
        var header: any = {};
        // 如果token存在,则携带请求头
        if (token) {
            header.token = token;
        }

        // 返回一个promise对象
        return new Promise((resolve, reject) => {
            //uni-app 提供的API进行网络发请求
            uni.request({
                url: baseURL + params.url,// 请求的地址
                method: params.method || 'GET',// 请求方式
                data: params.data || {},// 携带的参数
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
    get(params: any) {
        params.method = "GET";
        return this.API(params);
    }
    // post请求方法
    post(params: any) {
        params.method = "POST";
        return this.API(params);
    }
    // delete 请求方法
    delete(params: any) {
        params.method = "DELETE";
        return this.API(params);
    }
}
// 暴漏数据
export default Service;


