// pages/shopcart/shopcart.js
import {reqCart} from '../../api/index'
import Dialog from '@vant/weapp/dialog/dialog';
import debounce from 'lodash.debounce'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 购物车商品列表
        cartList:[], //存储购物车的数据
        selectAll:false,//全选的状态
        total:123, //计算商品的总价
        totalCount:4 //计算结算商品的总个数
    },
    //页面首次加载完成:获取一次购物车数据
    onShow() {
        //添加访问购物车登录判断--token
        const token = wx.getStorageSync('TOKEN');
        if(token){
            this.getUserCart();
        }else{
            //未登录用户去登录页
            wx.navigateTo({
              url: '/pages/login/login',
            })
        }
    },
    //获取用户购物车的数据
    async getUserCart() {
        const result = await reqCart();
        if (result.code == 200) {
            this.setData({
                cartList: result.data
            });
            //计算购物车商品的总价
            this.computeTotalPrice();
            //计算商品的总个数
            this.computedTotalCount();
            //计算底部的全选的状态
            this.computedAllSelect();
        }
    },
    //计算商品总价
    computeTotalPrice() {
        const totalPrice = this.data.cartList.reduce((prev, next) => {
            //商品勾选情况
            if (next.isChecked) {
                prev += next.price * next.count;
            }
            return prev;
        }, 0);
        //更新总价
        this.setData({
            total: totalPrice
        })
    },
    //计算总个数
    computedTotalCount() {
        const totalCount = this.data.cartList.reduce((prev, next) => {
            //商品勾选情况
            if (next.isChecked) {
                prev += next.count;
            }
            return prev;
        }, 0);
        //更新总价
        this.setData({
            totalCount
        })
    },
    //计算全选状态
    computedAllSelect() {
        //数组的length务必大于零个
        const checked = this.data.cartList.every(good => good.isChecked == 1) && this.data.cartArr.length > 0;
        //更新响应式数据
        this.setData({
            selectAll: checked
        })
    },
    //商品的勾选状态的更新回调
    async updateChecked(event) { // event 指向当前 行对象
        //获取当前商品的ID
        const goodsId = event.currentTarget.dataset.goodsid;
        //勾选的状态参数 携带1|0
        const isChecked = event.detail ? 1 : 0;
        //更新商品的勾选的状态
        try {
            //更新商品的状态成功
            await reqUpdateChecked(goodsId, isChecked);
            //再次获取购物车的数据
            this.getUserCart();
        } catch (error) {
            console.log(error)
        }
    },
    //删除商品的回调
    deleteGood(event) {
        //删除商品的ID
        const goodsId = event.currentTarget.dataset.goodsid;
        Dialog.confirm({
            title: '删除商品'
        }).then(async () => {
            //删除商品成功以后
            await reqDeleteGood(goodsId);
            //再次获取购物车的数据
            this.getUserCart();
        })
        .catch((err) => {
            console.log(err);
        });
    },
    //更新数量的钩子
    //点击+-文本框只要文本发生变化就会触发
    // 使用lodash的 debounce 方法 实现防抖
    updateCount: debounce(async function (event) { // event代表当前行对象
        //修改商品的id
        const goodsId = event.currentTarget.dataset.goodsid;
        // 计算差值
        const oldValue = event.currentTarget.dataset.oldvalue;
        //event.detail输入的新值 - 旧值
        const count = event.detail - oldValue;
        //如果差值为零没有变化不需要更新
        if (count != 0) {
            //更新数量
            await reqAddOrUpdateCart(goodsId, count);
            //再次获取购物车的数据
            this.getUserCart();
        }
    },300),
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