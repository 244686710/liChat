import  React  from 'react'
// import { addGUN } from './index.redux' // 解耦，不在组件内部引入参数，及方法
import {connect} from 'react-redux'
import {addGUN, removeGUN, addGunAsync} from './index.redux'

const actionCreators = {addGUN, removeGUN, addGunAsync}

// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
    // 你要state什么属性放到props里
    state => state, 
    // 你要什么方法，放到props，自动dispatch
    actionCreators
)
class App extends React.Component{
    // constructor( props) {
    //     super(props)
    // }
    render () {
        return (
            <div>
                <h1>现在有机枪{this.props.counter}把</h1>
                <button onClick = {this.props.addGUN}>申请武器</button>
                <button onClick = {this.props.removeGUN}>回收武器</button>
                <button onClick = {this.props.addGunAsync}>拖两天再给</button>
            </div>
        )
    }
}


export default App;