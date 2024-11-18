//通过Page方法创建页面   App->Page
Page({
    //页面数据
    data: {
        name: '结城sakuna',
        deg:0,
        showtopBtn:false
    },
    //编程式导航按钮回调
    goDetail(){
        //编程式导航页面跳转
        //navigateTo:A->B，但是A页面不会销毁(不能跳转到tabbar页面)
        //redirectTo 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
        wx.redirectTo({
          url: '/pages/detail/detail?a=1&b=2',
        })
    },
    // 监听页面滚动
    onPageScroll(event){
        // 判断
        if(event.scrollTop >= 300){
            this.setData({
                showtopBtn:true
            })
        }else{
            this.setData({
                showtopBtn:false
            })
        }
    },
    // 回到顶部
    toTop(){
        wx.pageScrollTo({
            scrollTop:0,
            duration:400
        })
    }
})