// pages/address/add/add.js
import {
    reqAddAddress,
    reqEditAddress,
    reqUpdateAddress
} from '../../../api/index';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '', //新增收件人的名字,
        phone: '', //收件人的手机号码
        provinceCode: '', //省的区域编号
        cityCode: '', //市
        districtCode: '', //区
        address: '', //详细地址
        tagName: '家', //标签
        isDefault: 0, //默认地址
        //展示地址:省/市/区
        region: '',
        // 存储 用户收货地址id
        id: ''
    },
    //picker的change事件
    selectCity(event) {
        //收集数据:请求携带
        this.setData({
            provinceCode: event.detail.code[0], //省的code
            cityCode: event.detail.code[1], //市
            districtCode: event.detail.code[2], //区
            region: event.detail.value.join('/')
        })
    },
    //收集开关的数据
    handler(event) {
        this.setData({
            isDefault: event.detail.value ? 1 : 0
        })
    },
    //保存按钮
    async save() {
        // 如果id存在，则代表更新按钮
        if (this.data.id) {
            var result = await reqUpdateAddress(this.data);
        } else {
            //添加
            var result = await reqAddAddress(this.data);
        }
        //判断添加或者更新是否成功
        if (result.code == 200) {
            // 路由返回
            wx.navigateBack();
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 如果id存在 则代表 编辑按钮 过来的
        if (options.id) {
            this.setData({
                // 存储地址的id
                id: options.id
            });
            // 获取 当前编辑按钮点击的 地址信息
            this.getAddressById();
        }
    },
    // 
    async getAddressById() {
        // 由于微信小程序路由跳转不能携带引用类型数据
        // 因此如果是编辑而来,需要根据用户ID发请求获取更新用户地址信息
        const result = await reqEditAddress(this.data.id);
        if (result.code == 200) {
            const {
                name,
                phone,
                address,
                tagName,
                isDefault,
                provinceCode,
                cityCode,
                districtCode,
                provinceName,
                cityName,
                districtName
            } = result.data;
            this.setData({
                name,
                phone,
                address,
                tagName,
                isDefault,
                provinceCode,
                cityCode,
                districtCode,
                region: `${provinceName}/${cityName}/${districtName}`
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