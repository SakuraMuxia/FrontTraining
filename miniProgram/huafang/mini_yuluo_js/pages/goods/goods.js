import { reqGoodsList } from "../../api/index";

// pages/goods/goods.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        limit: 10,
        category2Id: '', // c2id 分类id
        //存储对应商品的数据
        goodList: [],
        flag: "", //控制到底要不要再发请求 more nomore
    },
    // 获取商品列表
    async getGoodsList(){
        const {page,limit,category2Id} = this.data;
        const result = await reqGoodsList(page, limit, category2Id);
        //修改status的状态数值:需要判断有没有下一次请求
        if (result.data.records.length < 10) {
            //修改状态:第一次返回四个,没有更多
            this.setData({
                flag: 'nomore'
            })
        }else {
            this.setData({
                flag: 'more'
            })
        }
        // 存储新的商品之前:需要与老的商品的数组合并
        const goodList = this.data.goodList;
        // 把服务器返回的商品列表,添加到老商品列表
        goodList.push(...result.data.records)
        // 动态更新商品列表
        this.setData({
            goodList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取 url 中的param
        // console.log('option is ',options.category2Id)
        this.setData({
            category2Id:options.category2Id || ""
        })
        //获取商品列表
        this.getGoodsList();
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
        //判断:触底的时候状态more
        if(this.data.flag === 'more'){
            //参数:当前页码+1
            this.setData({
                page:this.data.page + 1
            });
            //再次发请求，获取下一页
            this.getGoodsList();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})