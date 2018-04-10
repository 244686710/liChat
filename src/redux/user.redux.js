import {getRedirectPath} from '../util'
import axios from 'axios'
import { stat } from 'fs';
const REGiSTER_SUCCESS = 'REGiSTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const iniState = {
    redirectTo:'',
    isAuth: '',
    msg: '',
    user: '',
    type: '',
}
// reducer
export function user(state = iniState, action) {
    switch (action.type){
        case REGiSTER_SUCCESS :
        return {...state, 
                msg: '',
                redirectTo:getRedirectPath(action.payload),
                isAuth: true,
                ...action.payload}
        case LOGIN_SUCCESS: 
        return {...state, 
            msg: '',
            redirectTo:getRedirectPath(action.payload.type),
            isAuth: true,
            ...action.payload}
        case LOAD_DATA :
            return {
                ...state, msg: '', ...action.payload
            }
        case AUTH_SUCCESS :
            return {...state, 
                msg: '',
                redirectTo:getRedirectPath(action.payload),
                isAuth: true,
                ...action.payload}
        case ERROR_MSG :
            return {...state, isAuth: false, msg: action.msg}


        default:
        return state

    }
}
// function registerSuccess(data) {
//     return {type: REGiSTER_SUCCESS, payload: data}
// }
// function loginSuccess(data) {
//     return {type: LOGIN_SUCCESS, payload:data}
// }
function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload:data}
}

function errorMsg (msg) {
    return {msg, type: ERROR_MSG}
}

export function loadData(userinfo){
    console.log(userinfo)
    return {type: LOAD_DATA, payload: userinfo}
}

export function login({user,pwd}){
    if(!user|| !pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status ===200 && res.data.code ===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function register({user, pwd, repeatpwd, type}){
    if(!user|| !pwd|| !type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd){
        return errorMsg('两次密码不相同')
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
        .then(res=> {
            if(res.status ===200 && res.data.code ===0){
                dispatch(authSuccess({user, pwd, type}))
            }else {

            }
        })
    }   
}

export function updata(data) {
    return dispatch => {
        axios.post('user/updata',data)
            .then(res=>{
                if(res.status ===200 && res.data.code ===0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
