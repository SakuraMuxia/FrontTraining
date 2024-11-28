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
export const reqGoodsList = (page, limit, category2Id) => {
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

// 获取商品详情的接口api
export const reqGoodsDetail = (goodsId) => request({
    url: `/mall-api/goods/${goodsId}`
})

//获取订单详情页-立即购买的商品的信息
export const reqBuyNowGoodsInfo = (goodsId, blessing) => request({
    url: `/mall-api/order/buy/${goodsId}?blessing=${blessing}`
})

//获取订单收货人地址信息
export const reqAdress = () => request({
    url: `/mall-api/userAddress/getOrderAddress`
})

// 新增收货人
export const reqAddAddress = (data) => request({
    url: `/mall-api/userAddress/save`,
    method: 'post',
    data
});
// 获取地址列表的数据
export const reqAddressList = () => request({
    url: `/mall-api/userAddress/findUserAddress`
})

// 获取某个用户地址数据接口
export const reqEditAddress = (id) => request({
    url: `/mall-api/userAddress/${id}`
})

//更新已有的地址
export const reqUpdateAddress = (data) => request({
    url: `/mall-api/userAddress/update`,
    method:'POST',
    data
})
//删除某个用户的地址信息
export const reqDeleteUser = (id)=>request({url:`/mall-api/userAddress/delete/${id}`});

//提交订单的接口
export const reqSubmit = (data) => request({
    url: `/mall-api/order/submitOrder`,
    method: "POST",
    data
})

//获取支付参数接口
export const reqPayInfo = (orderNo) => request({
    url: `/mall-api/webChat/createJsapi/${orderNo}`
});

//支付结果的查询
export const reqPayStatus = (orderNo) => request({
    url: `/mall-api/webChat/queryPayStatus/${orderNo}`
})