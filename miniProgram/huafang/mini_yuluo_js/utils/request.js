// 网络请求全部的页面使用--功能封装函数(复用)
// params:调用函数传递参数 {url:'xxxx'.method:'post',data:{a:1}}
export default (params) => {
    return new Promise((resolve,reject)=>{
        //请求基础路径
        const baseURL = 'https://gmall-prod.atguigu.cn'
        //发请求之前加载效果出来
        wx.showLoading({
            title: '加载....',
        });
        // 获取token信息
        const token = wx.getStorageSync('TOKEN');
        // 定义请求头
        let header = {};
        // 如果token存在,添加请求头
        if (token) {
            header.token = token;
        }
        // 发请求
        wx.request({
            //请求URL----绝对路径
            url: baseURL + params.url,
            //请求方式
            method: params.method || "GET",
            //携带请求体
            data: params.data || {},
            // 携带请求头
            header,
            //成功回调
            //res即为服务器响应数据
            success(res) {
                //返回一个成功的Promise对象
                //简化数据
                resolve(res.data);
            },
            fail(error) {
                reject(error);
            },
            //成功与失败钩子
            complete() {
                //加载效果取消
                wx.hideLoading()
            }
        })
    })
}