import React ,{useRef} from 'react'
import ClassTest from './components/ClassTest'
import FunTest from './components/FunTest';

export default function App() {
    const classRef = useRef();
    const funRef = useRef('我是谁？');
    return (
        <div>
            <h3>函数组件 绑定ref</h3>
            <FunTest ref={funRef} />
            <hr />
            <button onClick={() => {
                // 操作子组件中的dom
                // funRef.current.style.color='red'
                // funRef.current.style.fontSize = '30px'
                funRef.current.changeColor();
                funRef.current.changeFontSize();
            }}>获取ref</button>
        </div>
    )
}
