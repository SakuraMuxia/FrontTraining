// src/routes/index.tsx
import { lazy, Suspense, FC } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { HomeOutlined, ShopOutlined } from "@ant-design/icons";
import type { XRoutes } from "./types";

// import { Translation } from "react-i18next";

import {
    Layout,
    EmptyLayout,
    // CompLayout
} from "../layouts";
import Loading from "@comps/Loading";

const Login = lazy(() => import("@pages/login"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const NotFound = lazy(() => import("@pages/404"));
const HospitalSet = lazy(() => import("@pages/hospital/hospitalSet/HospitalSet"));

// 定义load函数：用于懒加载
const load = (Comp: FC) => {
    return (
        // 因为路由懒加载，组件需要一段网络请求时间才能加载并渲染
        // 在组件还未渲染时，fallback就生效，来渲染一个加载进度条效果
        // 当组件渲染完成时，fallback就失效了
        <Suspense fallback={<Loading />}>
            {/* 所有lazy的组件必须包裹Suspense组件，才能实现功能 */}
            <Comp />
        </Suspense>
    );
};

// 路由配置
const routes: XRoutes = [
    {
        path: "/",
        // (带逻辑判断组件:如果登陆过就重定向到当前目录,若未登录重定向到登陆页面)
        element: <EmptyLayout />,
        children: [
            {
                path: "login",
                element: load(Login),
            },
        ],
    },
    {
        path: "/syt",
        // (带逻辑判断组件: 如果登陆过就重定向到dashboard页面, 若未登录重定向到登陆页面)
        element: <Layout />,
        children: [
            {
                // 路由路径
                path: "/syt/dashboard",
                meta: {
                    icon: <HomeOutlined />,
                    title: '首页'
                },
                element: load(Dashboard),
            },
            {
                // 路由路径
                path: "/syt/hospital",
                meta: {
                    icon: <ShopOutlined />,
                    title: '医院管理'
                },
                children: [
                    {
                        path: '/syt/hospital/hospitalSet',
                        meta: {
                            title: '医院设置'
                        },
                        element: load(HospitalSet)
                    }
                ]
            }
        ],
    },

    {
        path: "/404",
        element: load(NotFound),
    },

    {
        path: "*", // 任意路径：除了上面路径以外其他路径
        element: <Navigate to="/404" />,
    },
];

/* 
自定义hook: 注册应用的所有路由
*/
export const useAppRoutes = () => {
    return useRoutes(routes);
};

// 找到要渲染成左侧菜单的路由
export const findSideBarRoutes = () => {
    const currentIndex = routes.findIndex((route) => route.path === "/syt");
    return routes[currentIndex].children as XRoutes;
};

export default routes;
