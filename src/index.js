import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import config from './config'
import reducers from './reducers'
import Login from './components/login/login.js'
import Register from './components/register/register.js'
import AuthRoute from './components/authroute/authroute'
import BossInfo from './components/bossinfo/bossinfo'
import GeniusInfo from './components/geniusinfo/geniusinfo'

import {
    BrowserRouter, 
    Route,
    // Link,
    Redirect,
    Switch
} from 'react-router-dom'
import './index.css'

// const store = createStore(counter, applyMiddleware(thunk)) // applyMiddleware使用中间件
    // thunk的使用主要是修改我们action crate的方式
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 开启redux监控
));


 ReactDom.render(
    (<Provider store = {store}>  
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/geniusinfo" component={GeniusInfo}></Route>
                <Route path="/bossinfo" component={BossInfo}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
