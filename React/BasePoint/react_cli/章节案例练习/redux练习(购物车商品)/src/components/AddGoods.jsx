import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addGoods } from '../store/slice/goodsSlice'
import { useNavigate } from 'react-router-dom'
export default function AddGoods() {
    const gnameRef = useRef()
    const priceRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmitHandle = function(e){
        // 阻止默认行为
        e.preventDefault()
        // 获取数据
        let gname = gnameRef.current.value.trim()
        let price = +priceRef.current.value.trim()
        // 定义商品数据
        const goods = {
            gname,
            price
        }
        // 将数据添加到切片
        dispatch(addGoods(goods))
        // 编程式导航:跳转到商品列表
        navigate('/goodslist')
    }
    return (
        <>
            <h3>添加商品</h3>
            <form onSubmit={onSubmitHandle}>
                <p>商品名称：<input type="text" name="" id="" ref={gnameRef} /></p>
                <p>商品价格：<input type="text" name="" id="" ref={priceRef} /></p>
                <p><button>添加商品</button></p>
            </form>
        </>
    )
}

