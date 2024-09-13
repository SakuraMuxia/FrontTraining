import React, { Component } from 'react'

export default class App extends Component {
    // 定义数据状态
    state = {
        count: 99,
        msg: 'Hanser is Angle'
    }
    constructor() {
        super();
        // bind 配合constructor 实现改变click5this指向当前实例
        this.click5 = this.click5.bind(this);
    }
    // 定义方法修改数据状态
    click1() {
        console.log('click1 this: ', this); // 事件的回调是window调用的，所以是undefined
    }
    click2() {
        // bind作用： 改变函数的this指向，返回一个新的函数
        console.log('click2 this: ', this);
    }
    click3() {
        // 包裹箭头函数，使用外部作用域 render中的this => 组件实例
        console.log('click3 this: ', this);
    }
    click4 = () => {
        // 使用的是constructor中的this
        console.log('click4 this: ', this);
    }
    click5() {
        console.log('click5 this: ', this);
    }

    render(){
        console.log(this);// render函数是类的实例对象调用的，永远指向当前实例对象
        let { count, msg } = this.state;
        return (
            <div>
                <h4>App</h4>
                <p>count : {this.state.count}-{count}</p>
                <p>msg: {this.state.msg}-{msg}</p>
                <p><button onClick={this.click1}>count++ 有问题的</button></p>
                <p><button onClick={this.click2.call(this)}>通过bind修改 count++ </button></p>
                <p><button onClick={() => this.click3()}>包裹箭头函数</button></p>
                <p><button onClick={this.click4}>直接定义成箭头函数</button></p>
                <p><button onClick={this.click5}>bind结合构造函数</button></p>
            </div>
        )
    }
}

