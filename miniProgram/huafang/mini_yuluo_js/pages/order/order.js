import { reqCart, reqBuyNowGoodsInfo, reqAdress, reqSubmit, reqPayInfo, reqPayStatus } from '../../api/index'
import moment from 'moment';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userAddress: {}, //收货人的地址
        goodsId: 0, //存储立即购买而来的商品的ID
        remarks: '', //存储立即购买的携带祝福语
        cartList: [], //展示商品的数组
        totalPrice: 0, //存储商品的总价
        buyName: '', //收集订购人的名字
        buyPhone: '', //订购人手机号码
        isShowPop: false, //控制pop弹窗显示与隐藏
        minDate: new Date().getTime(), //日期显示最小的时间
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 携带祝福语:立即购买而来
        if (options.remarks) {
            // 存储祝福语与立即购买商品的ID
            this.setData({
                goodsId: options.goodsId,
                remarks: options.remarks
            });
            // 调用 获取立即购买商品 方法
            this.getGoodsByImme()

        } else {
            // 调用 获取购物车商品 方法
            this.getGoodsByCart();
        }
    },
    //  获取 立即购买商品 方法
    async getGoodsByImme(){
        // 解构出 商品id和祝福语
        const {goodsId,remarks} = this.data;
        // 发送请求 获取立即购买的商品的信息
        const result = await reqBuyNowGoodsInfo(goodsId, remarks);
        // 如果响应状态码为200
        if (result.code == 200) {
            // 存储数据状态
            this.setData({
                cartList: result.data.cartVoList, //商品信息
                totalPrice: result.data.totalAmount, //立即购买商品总价
            })
        }
    },
    // 获取 购物车商品 方法
    async getGoodsByCart (){
        // 发送获取购物车请求
        const result = await reqCart();
        // 判断响应码是否为200
        if (result.code == 200) {
            // 存储购物车的数据
            this.setData({
                cartList: result.data
            });
            // 获取购物车数据完毕以后计算总价
            this.computedTotal();
        }
    },
    // 计算购物车商品总价
    computedTotal(){
        const total = this.data.cartList.reduce((prev,next)=>{
            return prev += next.count * next.price;
        },0)
        //更新总价
        this.setData({
            totalPrice:total
        })

    },
    // 获取用户 收货地址
    async getUserAddress() {
        const result = await reqAdress();
        if (result.code == 200) {
            this.setData({
                userAddress: result.data
            })
        }
    },
    // 弹出日期选择卡
    showPop(){
        this.setData({
            isShowPop: true
        })
    },
    //收集确定的预期时间
    confirm(event) {
        this.setData({
            // 把当前时间的字符串 处理为 响应格式
            deliveryDate: moment(event.detail).format('YYYY-MM-DD'),
            // 关闭pop
            isShowPop: false
        })
    },
    //遮罩层与取消
    close() {
        this.setData({
            isShowPop: false
        })
    },
    // 结算按钮回调
    async submitOrder(){
        //整理参数
        const data = {
            userAddressId: this.data.userAddress.id, //收货人地址的ID
            buyName: this.data.buyName, //订购人姓名
            buyPhone: this.data.buyPhone, //订购人手机号码
            deliveryDate: this.data.deliveryDate, //期望送达日期
            remarks: this.data.remarks, //祝福语
            cartList: this.data.cartList, //商品数组
        }
        // 发送请求
        const result = await reqSubmit(data);
        if (result.code == 200) {
            console.log("订单号是 ",result.data)
            //获取支付参数信息
            this.getPayParams(result.data);
        }
    },
    //获取wx支付相关的参数
    async getPayParams(orderNo) {
        //获取支付参数
        const result = await reqPayInfo(orderNo);
        console.log('获取的订单参数是 ',result.data);
        if (result.code == 200) {
            //发起微信支付:你们没有办法真机测试
            wx.requestPayment({
                nonceStr: result.data.nonceStr,
                package: result.data.package,
                paySign: result.data.paySign,
                timeStamp: result.data.timeStamp,
                signType: result.data.signType,
                //支付成功的回调
                async success() {
                    // 询问后台服务器支付的结果在进行下一步处理
                    const result = await reqPayStatus(orderNo);
                    console.log("询问服务支付结果 ",result)
                    if (result.code == 200) {
                        wx.navigateTo({
                            url: '/pages/order/paySuccess/paysuccess',
                        })
                    }
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        //不管是购物车而来、还是立即购买而来都需要收货人的地址
        this.getUserAddress();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})