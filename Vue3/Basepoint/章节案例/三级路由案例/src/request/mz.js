import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const mzlist = axios.create({
    baseURL: "https://m.maizuo.com/",
    timeout: 10000,
    headers: {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"172535550811886210322530305","bc":"440300"}',
        "X-Host": "mall.film-ticket.film.list"
    }
});

const mzinfo = axios.create({
    baseURL: "https://m.maizuo.com/",
    timeout: 10000,
    headers: {
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"172535550811886210322530305","bc":"440300"}',
        "X-Host": "mall.film-ticket.film.info"
    }
});


mzlist.interceptors.request.use(config => {
    nprogress.start()
    return config;
})

// 设置响应拦截器
mzlist.interceptors.response.use(res => {
    nprogress.done()
    return res.data;
})

mzinfo.interceptors.request.use(config => {
    nprogress.start()
    return config;
})

// 设置响应拦截器
mzinfo.interceptors.response.use(res => {
    nprogress.done()
    return res.data;
})

export {
    mzlist,
    mzinfo
}