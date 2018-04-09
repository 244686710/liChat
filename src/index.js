import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import config from './config'
import 'antd-mobile/dist/antd-mobile.css';
import {
    BrowserRouter, 
    Route,
    // Link,
    Redirect,
    Switch
} from 'react-router-dom'
import Auth from './Auth'
import Dasboard from './Dashboard'
import reducers from './reducers'

// const store = createStore(counter, applyMiddleware(thunk)) // applyMiddleware使用中间件
    // thunk的使用主要是修改我们action crate的方式
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 开启redux监控
));

console.log(store.getState())

 ReactDom.render(
    (<Provider store = {store}>  
        <BrowserRouter>
            <Switch>
            {/*只渲染命中的第一个Route*/}

                {/*<Redirect to="qibinglian"></Redirect> */}
                <Route path="/login" component={Auth}></Route>
                <Route path="/dashboard" component={Dasboard}></Route>
                <Redirect to='/dashboard'></Redirect>
            </Switch>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)
