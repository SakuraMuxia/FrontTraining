import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addCart } from '../store/slice/cartSlice'
export default function GoodsList() {

    const {goods} = useSelector(state => state.goods)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const jumpToCart = (good)=>{
        // 调用方法添加到购物车
        dispatch(addCart(good))
        // 跳转到购物车页面
        navigate('/cartlist')
    }
    return (
        <div>
            <h3>商品列表</h3>
            <ul>
                {goods.map(good=>(
                    <li key={good.id}>
                        <h3>商品名: {good.gname}</h3>
                        <p>商品价格: {good.price}</p>
                        <p><button onClick={()=>jumpToCart(good)}>加入购物车</button></p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
