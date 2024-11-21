// pages/edit/edit.js
import { reqUserInfo,reqUpdateInfo } from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户昵称
        nickname: '',
        //  头像
        headimgurl: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取用户信息
        this.getUserInfo();
    },
    //获取用户信息(请求头携带token)
    async getUserInfo() {
        const result = await reqUserInfo();
        if (result.code == 200) {
            this.setData({
                nickname: result.data.nickname,
                headimgurl: result.data.headimgurl
            })
        }
    },
    //获取用户头像的回调
    chooseAvatar(event) {
        this.setData({
            headimgurl: event.detail.avatarUrl
        })
    },

    //更新信息按钮的回调
    async updateUser() {
        //用户信息更新成功,回到tabbar个人中心页面
        //navigateTo|redirectTo
        // 发送请求
        const result = await reqUpdateInfo(this.data);
        if (result.code == 200) {
            //返回个人中心[login登录页销毁了!!!]
            wx.navigateBack();
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