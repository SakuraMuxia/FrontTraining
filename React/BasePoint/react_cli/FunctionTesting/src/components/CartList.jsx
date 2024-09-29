import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addBuyNum,decBuyNum } from '../store/slice/cartSlice'

export default function CartList() {
    const { cartList } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    return (
        <div>
            <h3>购物车列表</h3>
            <ul>
                {cartList.map((cart)=>(
                    <li key={cart.id}>
                        <h3>商品名: {cart.gname}</h3>
                        <p>商品价格: {cart.price}</p>
                        <p>购买数量: 
                            <button onClick={()=>{
                                dispatch(decBuyNum(cart.id))
                            }}>-</button>
                            {cart.buyNum}
                            <button onClick={()=>{
                                dispatch(addBuyNum(cart.id))
                            }}>+</button>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
