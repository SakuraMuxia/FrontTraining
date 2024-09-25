/**
 * 封装所有的github相关的请求函数
 * 
 */
import githubReq from '../request/github'

/**
 * 
 * @param {*} keyword  关键字
 * @param {*} sortType  排序方式
 * @returns Promise对象
 * 
 */

export function getRepositories(keyword, sortType ='stars'){
    return githubReq.get('/search/repositories',{
        params: {
            q: keyword,
            sort: sortType
        }
    })
}

export function getUsers(username){
    return githubReq.get('/search/users', {
        params: {
            q: username
        }
    })
}