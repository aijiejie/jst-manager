import React, {Component} from "react"
import {Switch, Route} from "react-router-dom";
import Bar from "./bar";
import Line from "./line";
import Pie from "./pie";


import {loadAction} from "./redux/actions"
import {connect} from "react-redux"


class Charts extends Component {

    // 数据的新增action, 在这里, 执行一次

    componentDidMount() {

        // console.log("--", this.props.question_msg);
        // store.dispatch(loadAction)
        this.props.loadData()
    }


    render() {
        return (
            <div>
               <Switch>
                   <Route path={"/charts/bar"} component={Bar}/>
                   <Route path={"/charts/line"} component={Line}/>
                   <Route path={"/charts/pie"} component={Pie}/>
               </Switch>
            </div>
        )
    }
}

// 通过redux, 将参数映射到组件的props身上
let  mapStateToProps = (state) => {
    console.log("映射状态到组件属性上");
    return {
        question_msg: state
    }
}
let mapDispatchToProps = (dispatch) => {
    console.log("映射分发操作到组件属性上");
    return {
        loadData: () => dispatch(loadAction)
    }
}
const ChartsContainer = connect(mapStateToProps, mapDispatchToProps)(Charts)
export default ChartsContainer
