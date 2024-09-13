import React, { Component } from 'react'
import Child from './components/Fun/Child'

export default class App extends Component {
    render() {
        return (
            <div>
                <h3>App</h3>
                {/* {99} : 99是number类型，默认不带{}直接写99是string类型 */}
                <Child age={99} name='atguigu' />
            </div>
        )
    }
}