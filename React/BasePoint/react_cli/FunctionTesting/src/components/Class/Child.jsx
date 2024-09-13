import React, { Component } from 'react'
// 1. 引入属性检查的包
import PropTypes from 'prop-types'
export default class Child extends Component {
    // 定义静态属性
    static propTypes = {
        name: PropTypes.string.isRequired, // name是字符串，且必须传
        age: PropTypes.number // age 是数字，可以不传
    }
    // 定义静态方法
    static defaultProps = {
        age: 100 // 限定默认值
    }    
    render() {
        let { name, age } = this.props;
        return (
            <div>
                <h3>Child</h3>
                <p>props name: {name}</p>
                <p>props age: {age}</p>
            </div>
        )
    }
}
