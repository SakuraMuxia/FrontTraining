import { Navigate} from 'react-router-dom'
import { lazy, Suspense } from "react";

import Home from '../pages/Home/Home'
import News from '../pages/Home/News/News'
const About = lazy(() => import("../pages/About/About"));
const Messages = lazy(() => import("../pages/Home/Messages/Messages"));
const PathTest = lazy(() => import("../pages/Home/Messages/PathTest/PathTest"));
const QueryTest = lazy(() => import("../pages/Home/Messages/QueryTest/QueryTest"));
const StateTest = lazy(() => import("../pages/Home/Messages/StateTest/StateTest"));

// 封装一个Suspense加载组件的函数
function load(Com) {
    return (
        <Suspense fallback={<div>组件正在加载中....</div>}>
            <Com />
        </Suspense>
    )
}

const routes = [
    {
        path:'/home',
        element: <Home />,
        children:[
            {
                // 简写，注意前面不能有 / ，否则就认为是一级路由
                path: 'news',
                element: <News />
            },
            {
                // path:'/home/message', // 完整路径写法
                path: 'message',
                element: load(Messages),
                children: [
                    {
                        // path-params参数需要配置路径占位符
                        path: '/home/message/path/:id/:school',
                        element: load(PathTest)
                    },
                    {
                        path: '/home/message/query',
                        element: load(QueryTest)
                    },
                    {
                        path: '/home/message/state',
                        element: load(StateTest)
                    }
                ]
            },
            // 重定向
            {
                path: '/home',
                element: <Navigate to='/home/news' />
            }
        ]
    },
    {
        path: '/about',
        element: load(About)
    },
    {
        path: '/',
        element: <Navigate to='/home' />
    },
]

export default routes