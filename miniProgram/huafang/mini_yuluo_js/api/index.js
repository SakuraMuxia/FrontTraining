import request from '../utils/request';
// 获取首页数据
// banner
export const reqBanner = () =>{
    return request({
        url:"/mall-api/index/findBanner"
    })
}
// 获取首页分类的数据
export const reqCategory = () =>{
    return request({
        url:"/mall-api/index/findCategory1"
    })
}
// 猜你喜欢的接口
export const reqLike = () =>{
    return request({
        url:"/mall-api/index/findListGoods"
    })
}
// 热门推荐
export const reqHot = () =>{
    return request({
        url:`/mall-api/index/findRecommendGoods`
    })
}
//获取分类模块的数据
export const reqSort = () => request({
    url: `/mall-api/index/findCategoryTree`
})