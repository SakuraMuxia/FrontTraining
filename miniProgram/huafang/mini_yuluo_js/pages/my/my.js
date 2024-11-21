// pages/my/my.js
import {reqUserInfo} from '../../api/index'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        nickname: "",
        //头像
        headimgurl:''
    },
    //请登录文字点击事件回调
    goLogin() {
        //navigateTo|redirectTo都不能往tabbar页面跳转
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    //编辑个人中心按钮回调
    goEdit(){
        wx.navigateTo({
          url: '/pages/edit/edit',
        })
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
        //获取用户信息
        // 发请求前,先判断token是否存在
        const token = wx.getStorageSync('TOKEN');
        //用户授权过登录成功,在获取用户信息
        if (token) {
            //获取用户信息
            this.getUserInfo();
        }
    },
    // 获取用户信息
    async getUserInfo() {
        const result = await reqUserInfo();
         if(result.code==200){
             this.setData({
                 nickname:result.data.nickname,
                 headimgurl:result.data.headimgurl
             })
         }
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