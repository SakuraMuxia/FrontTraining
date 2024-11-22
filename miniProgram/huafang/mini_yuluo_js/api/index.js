import request from '../utils/request';
// 获取首页数据
// banner
export const reqBanner = () => {
    return request({
        url: "/mall-api/index/findBanner"
    })
}
// 获取首页分类的数据
export const reqCategory = () => {
    return request({
        url: "/mall-api/index/findCategory1"
    })
}
// 猜你喜欢的接口
export const reqLike = () => {
    return request({
        url: "/mall-api/index/findListGoods"
    })
}
// 热门推荐
export const reqHot = () => {
    return request({
        url: `/mall-api/index/findRecommendGoods`
    })
}
//获取分类模块的数据
export const reqSort = () => request({
    url: `/mall-api/index/findCategoryTree`
})
// 登陆接口 获取用户授权登陆token
export const reqToken = (code) => {
    return request({
        url: `/mall-api/weixin/wxLogin/${code}`
    })
}
// 获取用户信息
export const reqUserInfo = () => request({
    url: `/mall-api/weixin/getuserInfo`
});

//更新用户信息的接口
export const reqUpdateInfo = (data) => request({
    url: `/mall-api/weixin/updateUser`,
    method: 'post',
    data
});

// 获取商品列表
export const reqGoodsList = (page, limit, category2Id) =>{
    return request({
        url: `/mall-api/goods/list/${page}/${limit}?category2Id=${category2Id}`
    })
}

//获取用户购物车的数据
export const reqCart = () => request({
    url: `/mall-api/cart/getCartList`
})

//更新用户的商品的勾选的状态
export const reqUpdateChecked = (goodsId, isChecked) => request({
    url: `/mall-api/cart/checkCart/${goodsId}/${isChecked}`
})

//删除商品
export const reqDeleteGood = (goodsId) => request({
    url: `/mall-api/cart/delete/${goodsId}`
})

//此接口可以加入购物车|修改购物车某一个商品的数量
export const reqAddOrUpdateCart = (goodsId, count, blessing) => request({
    url: `/mall-api/cart/addToCart/${goodsId}/${count}?blessing=${blessing}`
})