// pages/login/login.js
import {reqToken} from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 登陆按钮回调钩子
    goLogin(){
        // 调用 wx.login 方法获取 code
        // 点击授权登录按钮:需要通过wx.login获取用户登录临时凭证code 
        wx.login({
            success: (res) => {
                // 调用登陆借口
                this.getToken(res.code)
            },
        })
    },
    // 获取token方法
    async getToken(code){
        const result =  await reqToken(code);
        if(result.code==200){
            //微信小程序本地持久化存储token 上限10M
            wx.setStorageSync('TOKEN', result.data.token);
            //跳转到编辑页
            wx.redirectTo({
                url: '/pages/edit/edit',
            })
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