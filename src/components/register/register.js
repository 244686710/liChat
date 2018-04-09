import React from 'react';
import Logo from '../../components/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'genius' // 或者boss
        }
    }
    render () {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type =='genuis'}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type =='boss'}>
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" >注册</Button>
                </WingBlank>   
              
            </div>
        ) 
    }
}

export default Register