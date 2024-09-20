import React, { Component, createRef } from 'react'

export default class FormOutControl extends Component {
    state = {
        username: '尚硅谷',
        password: '123123',
        sex: '1'
    }
    // 1. 创建ref对象
    usernameRef = createRef()
    passwordRef = createRef()
    sexRef = [createRef(), createRef()]
    save(e) {
        e.preventDefault();
        console.log('username: ', this.usernameRef.current.value);
        console.log('password: ', this.passwordRef.current.value);
        console.log(this.sexRef);// [{current:{checked:false,value:'1'}}, {current:{checked:true, value:'0'}}]
        console.log('sex: ', this.sexRef.find(item => item.current.checked).current.value);

    }
    render() {
        let { username, password, sex } = this.state;
        return (
            <>
                <form action="" onSubmit={this.save.bind(this)}>

                    <p>姓名： <input type="text" ref={this.usernameRef} name="username" defaultValue={username} /></p>

                    <p>密码： <input type="text" ref={this.passwordRef} name="password" defaultValue={password} /></p>

                    <p>
                        性别： 男 <input type="radio" ref={this.sexRef[0]} name="sex" value="1" defaultChecked={sex === '1'} />
                        女 <input type="radio" name="sex" ref={this.sexRef[1]} value="0" defaultChecked={sex === '0'} />
                    </p>
                    <p><button type='submit'>保存</button></p>
                </form>
            </>
        )
    }
}