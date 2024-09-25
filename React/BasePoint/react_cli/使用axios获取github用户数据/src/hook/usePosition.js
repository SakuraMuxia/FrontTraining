import { useEffect,useState } from 'react'
function usePosition(){
    // 设置初始值
    let [x, setX] = useState(110)
    let [y, setY] = useState(110)

    // componentDidMount
    useEffect(() => {
        function move(e) {
            setX(e.clientX)
            setY(e.clientY)
        }
        window.addEventListener('mousemove', move)
        // componentWillUnmount
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])

    return{
        x,
        y
    }

}
export default usePosition