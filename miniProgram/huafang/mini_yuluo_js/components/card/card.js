// components/card/card.js
Component({

    /**
     * 组件的属性列表
     */
    //类似于 vue中的 props，接收props
    properties: {
        list:{
            type:Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        //点击商品进入商品详情页
        goDetetail(event){
            //商品的ID
            const goodsId = event.currentTarget.dataset.goodsid;
            //点击商品进入详情
            wx.navigateTo({
                url: `/pages/goodsDetail/goodsDetail?goodsId=${goodsId}`,
            })
        }
    }
})