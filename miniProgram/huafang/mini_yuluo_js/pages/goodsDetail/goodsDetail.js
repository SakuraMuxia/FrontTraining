import {reqGoodsDetail ,reqAddOrUpdateCart} from '../../api/index'
import Toast from '@vant/weapp/toast/toast';
Page({
    data:{
        goodsId: '', //商品的详情ID
        goods: {}, //存储商品的详情的数据
        showSheet: false, //控制动作面包显示与隐藏
        type: '', //区分购物车立即购买
        skuNum: 1, //收集计数器商品数量
        remarks: '', //祝福语
    },
    onLoad(options){
        //存储商品的ID
        this.setData({
            goodsId: options.goodsId
        });
        //获取商品的详情
        this.getGoodsInfo();
    },
    //获取商品的详情的数据
    async getGoodsInfo() {
        const result = await reqGoodsDetail(this.data.goodsId);
        if (result.code == 200) {
            this.setData({
                goods: result.data
            })
        }
    },
    //加入购物车按钮的回调
    addCartHandle() {
        //显示动作面包
        this.setData({
            showSheet: true,
            type: 'cart'
        })
    },
    //立即购买按钮回调
    buynowHandle() {
        //显示控制面板展示商品的详情
        this.setData({
            showSheet: true,
            type: "buy"
        })
    },
    // 计步器函数
    skuNumChange(event){
        //存储商品的数量
        this.setData({
            skuNum: event.detail
        })
    },
    // 隐藏遮罩层
    //点击动作面板后面遮罩层
    overPlay(){
        //控制面板隐藏
        this.setData({
            showSheet: false,
            type: ''
        })
    },
    // 点击确定按钮
    //对应按钮的确定回调
    confirm() {
        // 判断有没有祝福语
        if (this.data.remarks.trim() == '') {
            Toast.fail('请填写祝福语');
            return;
        }
        //判断用户是否登录
        const token = wx.getStorageSync('TOKEN');
        //登录
        if (token) {
            // 加入购物车
            if (this.data.type == 'cart') {
                // 调用加入购物车函数
                this.addGoodsToCart();
            } else {
                // 调用立即购买的函数
                this.goOrderByImme();
            }
        } else {
            //未登录去登录(不能加入购物车，不能支付)
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
    },
    // 加入购物车方法
    async addGoodsToCart() {
        //整理参数
        const {
            goodsId,
            skuNum,
            remarks
        } = this.data;
        //发请求
        //加入购物车成功
        await reqAddOrUpdateCart(goodsId, skuNum, remarks);
        Toast.success('加入购物车成功');
        //关闭动作面板
        this.setData({
            showSheet: false,
            skuNum: 1,
            remarks: ''
        })
    },
    // 跳转订单页面函数
    goOrderByImme(){
        //立即购买的商品的ID与祝福语
        const {goodsId,remarks} = this.data;
        wx.navigateTo({
            url: `/pages/order/order?goodsId=${goodsId}&remarks=${remarks}`,
        })
        //清除祝福语
        this.setData({
            remarks:''
        })
    }
})