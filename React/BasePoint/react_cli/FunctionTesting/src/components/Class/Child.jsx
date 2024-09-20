import React, { Component } from 'react'
import moment from 'moment'
export default class Son extends Component {
    state = {
        nowDate: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    constructor() {
        super();
        console.log('Son constructor');
    }
    componentDidMount() {
        // 开启定时器
        console.log('Son ComponentDidMount')
        // 创建一个自定义属性，将定时器放在自定义属性上
        this.timer = setInterval(() => {
            console.log('interval');
            this.setState({
                nowDate: moment().format('YYYY-MM-DD HH:mm:ss')
            })
        }, 1000)
    }

    componentWillUnmount() {
        console.log('Son componentWillUnmount')
        clearInterval(this.timer);
    }

    render() {
        let { nowDate } = this.state;
        return (
            <div>
                当前时间： {nowDate}
            </div>
        )
    }
}
