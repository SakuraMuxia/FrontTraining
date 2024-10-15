import axios from 'axios';

// 1. 基础配置
const request = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 20000
})

// 2. 配置拦截器

// 请求拦截器
request.interceptors.request.use(config => {

    return config;
})

// 响应拦截器
request.interceptors.response.use(response => {

    return response.data;
})

export default request;