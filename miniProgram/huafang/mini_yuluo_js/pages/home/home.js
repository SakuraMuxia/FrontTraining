// pages/home/home.js
import {reqBanner,reqCategory,reqLike ,reqHot} from '../../api/index'

Page({

    //首页响应式数据地方
    data: {
        bannerArr: [], //存储首页轮播
        categoryArr: [], //分类数组
        likeArr: [], //猜你喜欢的数据
        hotArr:[],//热门推荐的数据
    },

    //页面生命周期函数onLoad发请网络请求
    onLoad(options) {
        //获取首页轮播
        this.getBanner();
        //获取首页分类的数据
        this.getCategory();
        //获取猜你喜欢的数据
        this.getLike();
        //获取热门推荐的数据
        this.getHot();
    },
    // 获取首页轮播图数据
    async getBanner() {
        const result = await reqBanner();
        if (result.code == 200) {
            this.setData({
                bannerArr: result.data
            })
        }
    },
    //获取首页分类的数据
    async getCategory() {
        const result = await reqCategory();
        if (result.code == 200) {
            this.setData({
                categoryArr: result.data
            })
        }
    },
    //猜你喜欢
    async getLike() {
        const result = await reqLike();
        if (result.code == 200) {
            this.setData({
                likeArr: result.data
            })
        }
    },
    //热门推荐
    async getHot() {
        const result = await reqHot();
        if(result.code==200){
            this.setData({
                hotArr:result.data
            })
        }
    },
    //查看更多按钮进入商品列表的页面
    findGoods(){
        wx.navigateTo({
            url: '/pages/goods/goods',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})