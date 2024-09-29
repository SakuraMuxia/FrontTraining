import { Navigate } from "react-router-dom"
import AddGoods from "../components/AddGoods"
import CartList from "../components/CartList"
import GoodsList from "../components/GoodsList"

const routes = [
    {
        path: '/addgoods',
        element: <AddGoods />
    },
    {
        path: '/goodslist',
        element: <GoodsList />
    },
    {
        path: '/cartlist',
        element: <CartList />
    },
    {
        index: true,
        element: <Navigate to='/addgoods' />
    }
]

export default routes;