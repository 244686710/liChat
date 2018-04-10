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
class GeniusInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
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
                <NavBar mode="light">牛人完善信息页面</NavBar>
                <WingBlank>
                <AvatarSelector selectAvatar={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector>
                <InputItem onChange={(v)=> this.onChange('title', v)}> 
                    求职岗位
                </InputItem>   
                <TextareaItem onChange={(v)=> this.onChange('desc', v)}
                    rows = {3}
                    title = '个人简介'
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
export default GeniusInfo