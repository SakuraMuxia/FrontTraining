// 定义默认请求配置项
const defaults = {
    timeout: 0,
    responseType: 'json'
};


/**
 * 发送 ajax 请求
 * @param {object} config 请求配置项
 * @returns {Promise} 
 */
function dispatchRequest(config) {
    return new Promise((resolve, reject) => {
        // 创建 xhr 对象
        const xhr = new XMLHttpRequest();
        // 设置响应类型
        xhr.responseType = config.responseType;
        // 设置超时时间
        xhr.timeout = config.timeout;
        // 初始化
        xhr.open(config.method, config.url);
        // 设置请求头
        if (config.headers) {
            for (let key in config.headers) {
                xhr.setRequestHeader(key, config.headers[key]);
            }
        }
        // 设置请求体
        let body;
        // 只有允许的请求方法，才可以携带请求体
        if (['POST', 'PUT', 'PATCH'].includes(config.method)) {
            // 如果请求体是String类型 
            if (typeof config.data === 'string') {
                body = config.data;
                // 设置请求头 请求体类型
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            // 如果请求体是json类型 
            }else if(Object.prototype.toString.call(config.data) === '[object Object]'){
                body = JSON.stringify(config.data);
                xhr.setRequestHeader('Content-type', 'application/json');
            }
        }else{
            body = config.data;
        }

        // 发送
        xhr.send(body);

        // 监听成功响应
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                    config,
                    request: xhr,
                    data: xhr.response,
                    statsu: xhr.status,
                    statusText: xhr.statusText,
                    headers: xhr.getAllResponseHeaders().split('\r\n').filter(item=>item).map(item=>item.split(': ')).reduce((pre,item)=>({...pre, [item[0]]:item[1]}), {})
                });
            } else {
                reject({
                    code: "ERR_BAD_REQUEST",
                    config,
                    message: "Request failed with status code " + xhr.status,
                    name: "AxiosError",
                    request: xhr
                });
            }
        }

        // 监听失败响应
        xhr.onerror = () => {
            reject({
                code: "ERR_NETWORK",
                config,
                message: "ERR_NETWORK",
                name: "AxiosError",
                request: xhr
            });
        }
        // 超时的事件
        xhr.ontimeout = () => {
            reject({
                code: "ECONNABORTED",
                config,
                message: `timeout of ${config.timeout}ms exceeded`,
                name: "AxiosError",
                request:xhr
            })
        }
    })
}
// 定义核心类
class Axios{
    // 构造器方法
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
    }
    /**
     * 发送 ajax 请求
     * @param {String|Object} configOrUrl url或者请求配置对象
     * @param {?Object} config 请求配置对象，如果第一个参数已经是对象，不需要该参数
     * @returns {Promise} 
     */
    request(configOrUrl={},config={}) {
        // 判断第一个参数是否是 url, config是一个对象
        if (typeof configOrUrl === 'string') {
            config.url = configOrUrl;
        }else{
            config = configOrUrl;
        }
        
        // 将传入的请求配置对象和全局请求配置对象合并
        config = Object.assign({}, this.defaults, config);
        
        // 设置默认请求方式是 GET
        config.method = (config.method || this.defaults.method || 'get').toUpperCase();
        // 合并 baseURL 和 url
        if (config.baseURL && !config.url.startsWith('http://') && !config.url.startsWith('https://')) {
            config.url = config.baseURL + config.url;
        }
        // 将 searchParams 拼接到 url 后面
        if (config.params) {
            config.url += '?' + Object.entries(config.params).map(item=>item[0]+'='+item[1]).join('&');
        }
        // 调用函数发送请求
        
        return dispatchRequest.call(this, config);
    }
}

// bind方法：改变fn函数this的指向（this指向thisArg对象），返回一个函数
function bind(fn, thisArg) {
    return function wrap() {
        // fn 就是 Axios.prototype.request
        // argments 是伪数组，成员是传递给 axios 函数的参数
        // 就是在调用 Axios.prototype.request， 并设置里面的this是Axios类的一个实例
        return fn.apply(thisArg, arguments);
    }
}

/**
 * 创建 axios 函数， axios函数本质不是 Axios 的实例
 * @param {Object} defaultConfig The default config for the instance
 * @returns {Function} 调用该函数就是调用Axios.prototype.request()
 */
function createInstance(defaultConfig) {
    // 实例化核心类型 得到实例
    const context = new Axios(defaultConfig);
    // 创建 axios 函数
    const instance = bind(Axios.prototype.request, context);
    // 给 instance 设置全局配置接口
    instance.defaults = context.defaults;
    // 返回
    return instance;
}

// 创建 axios
const axios = createInstance(defaults);

// 以模块的形式对外暴露
export default axios;

