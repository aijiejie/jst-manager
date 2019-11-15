import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import QuestionList from "./question-list";
import AddEditQuestion from "./add-edit-question"

export default class Question extends Component {

    render() {
        return (
           <Switch>
               <Route path={"/question/add-edit"} component={AddEditQuestion}/>
               <Route path={"/question"} component={QuestionList}/>
           </Switch>
        )
    }
}
