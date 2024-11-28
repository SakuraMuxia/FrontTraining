// pages/address/address.js
import {
    reqAddressList,
    reqDeleteUser
} from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressArr: [], //存储全部收件人地址
    },
    // 获取用户地址列表
    async getUserAddress() {
        const result = await reqAddressList();
        if (result.code == 200) {
            this.setData({
                addressArr: result.data
            })
        }
    },
    // 编辑按钮回调
    edit(event) {
        const id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/address/add/add?id=${id}`,
        })
    },
    // 删除按钮回调
    async del(event) {
        const id = event.currentTarget.dataset.id;
        const result = await reqDeleteUser(id);
        if(result.code==200){
            //再次获取全部收件人地址
            this.getUserAddress();
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    //每一次页面出现的时候都获取一次地址列表的数据
    onShow() {
        //获取地址列表
        this.getUserAddress();
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