jQuery(document).ready(function ($) {
    var tabNavItems = document.querySelectorAll('#index-cate .tab-nav-item');
    var tabPanelItems = document.querySelectorAll('#index-cate .tab-panel-item');
    var playBox = document.querySelector('#product-intro-tab');
    var timerIndex = 0;
    // 定时器
    var duration = 10000;
    var intervalId = setInterval(next, duration);
    tab(tabNavItems, tabPanelItems);
    function tab(tabNavItems, tabPanelItems) {
        tabNavItems.forEach(function (tabNavItem, index) {
            tabNavItem.onclick = function () {
                for (var i = 0; i < tabNavItems.length; i++) {
                    tabNavItems[i].classList.remove('active');
                    tabPanelItems[i].classList.remove('active');
                }
                tabNavItem.classList.add('active');
                tabPanelItems[index].classList.add('active');
            }
        });
    };
    //监听鼠标进入
    playBox.onmouseenter = function () {
        clearInterval(intervalId);
    };
    //监听鼠标离开
    playBox.onmouseleave = function () {
        //再次设置定时器，返回定时器标志
        intervalId = setInterval(next, duration);
    };
    function next() {

        timerIndex++;
        //判断不能超出有效范围
        if (timerIndex > tabNavItems.length - 1) {
            timerIndex = 0;
        };

        tabNavItems.forEach(function (tabNavItem, index) {
            tabNavItem.classList.remove('active');
            tabPanelItems[index].classList.remove('active');
        });
        // 添加active类名
        tabNavItems[timerIndex].classList.add('active');
        tabPanelItems[timerIndex].classList.add('active');
    };
    var mmenu = $('nav#mmenu').mmenu({
        slidingSubmenus: true,
        classes: 'mm-white', //mm-fullscreen mm-light
        extensions: ["theme-white"],
        offCanvas: {
            position: "right", //left, top, right, bottom
            zposition: "front" //back, front,next
            //modal		: true
        },
        searchfield: false,
        counters: false,
        //navbars		: {
        //content : [ "prev", "title", "next" ]
        //},
        navbar: {
            title: "网站导航"
        },
        header: {
            add: true,
            update: true,
            title: "网站导航"
        }
    });
    $(".closemenu").click(function () {
        var mmenuAPI = $("#mmenu").data("mmenu");
        mmenuAPI.close();
    });
});