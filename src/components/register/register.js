import React from 'react';
import Logo from '../../components/logo/logo'
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import { register } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state => state.user,
    {register}
)

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '', 
            pwd: '',
            repeatpwd:'',
            type: 'genius' // 或者boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange (key, val) {
        this.setState({
            [key]: val
        })

    }
    handleRegister () {
        console.log(this.props)
        this.props.register(this.state)
        console.log(this.state)
    }
    render () {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} /> : null }
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p>: ''}
                        <InputItem
                            onChange = {v=> this.handleChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                        type="password"
                            onChange = {v=> this.handleChange('pwd',v)}
                        >密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                        type="password"
                            onChange = {v=> this.handleChange('repeatpwd',v)}
                        >确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem checked={this.state.type === 'genius'}
                            onChange={() =>this.handleChange('type', 'genius')}
                        >
                            牛人sdfss
                        </RadioItem>
                        <RadioItem checked={this.state.type ==='boss'}
                            onChange={() =>this.handleChange('type', 'boss')}
                        >
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick = {this.handleRegister} >注册</Button>
                </WingBlank>   
              
            </div>
        ) 
    }
}

export default Register