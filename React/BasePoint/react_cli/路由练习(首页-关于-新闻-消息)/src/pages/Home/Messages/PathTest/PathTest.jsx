import React from 'react'
import { useParams } from 'react-router-dom'

export default function PathTest() {
    let res = useParams();
    console.log('res: ', res);

    // 解构接收使用
    let { id, school } = useParams();
    return (
        <div>
            <h3>PathTest</h3>
            <p>path id: {id}</p>
            <p>path school: {school}</p>
        </div>
    )
}
