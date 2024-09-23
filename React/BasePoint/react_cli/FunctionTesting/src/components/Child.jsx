// 1. 从react中解构 useEffect
import React, { useEffect, useState } from 'react'

import moment from 'moment'
export default function Timer() {
    let [nowDate, setNowDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));

    useEffect(() => {// componentDidMount
        let timer = setInterval(() => {
            console.log('定时器 is start...')
            setNowDate(moment().format('YYYY-MM-DD HH:mm:ss'))
        }, 1000)
        return () => { // componentWillUnmount
            console.log('定时器 is Unmount...');
            clearInterval(timer)
        }
    }, [])
    return (
        <div>
            <p>当前日期是: {nowDate}</p>
        </div>
    )
}