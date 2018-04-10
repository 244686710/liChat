import React from 'react'
import {NavBar, InputItem, WingBlank, TextareaItem, Button, WhiteSpace } from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {updata} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
    state => state.user,
    {updata}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    render(){
        return(
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}></Redirect>: '' }
                <NavBar mode="light">BOSS完善信息页面</NavBar>
                <WingBlank>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=> this.onChange('title', v)}> 
                    招聘职位
                </InputItem>   
                <InputItem onChange={(v)=> this.onChange('company', v)}> 
                    公司名称
                </InputItem>   
                <InputItem onChange={(v)=> this.onChange('money', v)}> 
                    职位薪资
                </InputItem>   
                <TextareaItem onChange={(v)=> this.onChange('desc', v)}
                    rows = {3}
                    title = '职位简介'
                > 
                    
                </TextareaItem>  
                <WhiteSpace/>
                <Button type="primary"
                    onClick = {
                        () => {
                            this.props.updata(this.state)
                        }
                    }
                >保存</Button>
                </WingBlank>
              
            </div>

        ) 

    }
}
export default BossInfo