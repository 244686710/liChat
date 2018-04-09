import React from 'react'
import {connect} from 'react-redux'
import {login, getUserDate} from './auth.redux'
import {Redirect} from 'react-router-dom'
import  axios  from 'axios'
// 两个reducers 
//  合并reducers
@connect (
    state =>state.auth,
    { login, getUserDate }
)
class Auth extends React.Component{
    constructor(props) {
        super(props)
        this.state= {
            data: {}
        }
    }
    componentDidMount() {
       this.props.getUserDate()
    }
    render () {
        return (
              <div>
                <h2>我的名字是 {this.props.user}，年龄{this.props.age}</h2>   
                {this.props.isAuth ? <Redirect to='/dashboard/'/> : null}
                <h2>你没有权限，需要登陆才可以看</h2>

                <button onClick={this.props.login}>登陆</button>

              </div>
        )
    }
}

export default Auth