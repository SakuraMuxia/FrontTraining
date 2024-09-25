import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 2000
})

// 配置请求拦截器
request.interceptors.request.use(config => {
    // 1. 请求头中携带公共参数 token
    // 2. 开启loading效果
    NProgress.start()
    return config;
})

// 配置响应拦截器
request.interceptors.response.use(response => {
    // 1. 关闭loading
    NProgress.done()
    // 2. 简化服务器数据
    return response.data;
})

export default request; // 将配置好的axios暴露