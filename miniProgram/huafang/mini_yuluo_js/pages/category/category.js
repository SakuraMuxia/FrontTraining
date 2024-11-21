import { reqSort } from "../../api/index"

// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0, //控制左侧菜单高亮
        sortArr: [], //存储分类的数据
    },

    //左侧菜单点击事件回调
    changeActive(event) {
        //修改active数据
        this.setData({
            active: event.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取分类的功能函数
        this.getData();
    },
    
    // 获取分类项目的数据
    async getData(){
        const res = await reqSort();
        if(res.code === 200){
            this.setData({
                sortArr:res.data
            })
        }
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