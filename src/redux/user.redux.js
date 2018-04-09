
const REGiSTER_SUCCESS = 'REGiSTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG'

const iniState = {
    isAuth: '',
    msg: '',
    user: '',
    pwd: '',
    type: '',
}
// reducer
export function user(state = iniState, action) {
    switch (action.type){
        case REGiSTER_SUCCESS :
        return {...state, msg: '', isAuth: true}
        case ERROR_MSG :
        return {...state, isAuth: false, msg: action.msg}
        default:
        return state

    }
}
function registerSuccess(data) {
    return {type: REGiSTER_SUCCESS, payload: data}
}

function errorMsg (msg) {
    return {msg, type: ERROR_MSG}
}

export function register({user, pwd, repeatpwd, type}){
    if(!user|| !pwd|| !type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd){
        return errorMsg('两次密码不相同')
    }
    return dispatch => {
        axios.post('./user/register', {user, pwd, type})
        .then(res=> {
            if(res.status ===200 && res.data.code ===0){
                dispatch(registerSuccess(res.data))
            }else {

            }
        })
    }

   
}