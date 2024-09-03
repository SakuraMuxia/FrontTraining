import { createRouter, createWebHashHistory, createWebHistory } from "vue-router"
// 生成路由组件的方法
const renderCom = function (name: string) {
    return () => import("@/pages/" + name + "/index.vue");
}

const routes = [
    {
        path: "/",
        redirect: "/home"
    }, 
    {
        path: "/home",
        component: () => import('@/pages/Home/index.vue'),
        children:[
            {
                path:'/home',
                redirect:'/home/newslist'
            },
            {
                path: "/home/message",
                component: () => import("@/pages/Home/Message/index.vue"),
                children: [
                    {
                        path: "/home/message/:filmId",
                        component: renderCom("Home/Message/Details")
                    }
                ]
            },
            {
                path: "/home/newsList",
                component: () => import("@/pages/Home/NewsList/index.vue")
            },
        ]
    },
    {
        path: "/about",
        component: () => import('@/pages/About/index.vue')
    },
    {
        // vue-router@4不支持以下代码实现404
        // path:"*",
        // component:NotFount

        // 需要借助params形式实结合正则实现404
        path: "/:pathMath(.*)",
        component: () => import('@/pages/NotFount/index.vue')
    }
]
// 3- 创建router
const router = createRouter({
    // 相当于Vue2当中的mode:"history"
    history: createWebHistory(),
    // 相当于Vue2当中的mode:"hash"
    // history:createWebHashHistory(),
    routes,
    scrollBehavior() {
        return {
            left: 0,// 相当于之前的x
            top: 0// 相当于之前的y
        }
    }
    // 
})
export default router