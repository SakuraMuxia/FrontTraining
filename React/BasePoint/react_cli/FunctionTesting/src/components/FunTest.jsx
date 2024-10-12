import React, { useRef } from 'react'
import { useImperativeHandle } from 'react';

// 通过函数组件中的第二个参数接收父组件传过来的 ref属性
function FunTest(props, ref) {
    console.log('ref:', ref); // 父组件传过来的 ref对象
    const myselfRef = useRef();

    // 设置父组件ref的权限，参数是 父组件ref和回调函数
    // 回调函数中的返回值是一个对象，对象中的方法就是给父组件ref使用的方法
    useImperativeHandle(ref, () => ({
        changeColor() {
            // 使用自己的ref对象绑定元素
            myselfRef.current.style.color = 'green';
        },
        changeFontSize() {
            myselfRef.current.style.fontSize = '30px';
        }
    }))
    return (
        // 未使用useImperativeHandle，父组件会完全控制子组件
        // <div ref={ref}>FunTest</div>
        // 使用useImperativeHandle，父组件只能操作useImperativeHandle中回调函数返回的对象中的方法
        <div ref={myselfRef}>FunTest</div>
    )
}
// 通过forwardRef()函数 让可以在函数组件上设置ref属性
export default React.forwardRef(FunTest)