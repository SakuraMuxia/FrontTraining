import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'

export default function App() {
    return (
        <div>
            <ul>
                <li><NavLink to='/addgoods'>添加商品</NavLink></li>
                <li><NavLink to='/goodslist'>商品列表</NavLink></li>
                <li><NavLink to='/cartlist'>购物车列表</NavLink></li>
            </ul>
            <hr />
            {useRoutes(routes)}
        </div>
    )
}

