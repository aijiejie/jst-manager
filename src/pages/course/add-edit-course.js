import React, {Component} from "react"
import {Card, Form, Input, Select, Button, message} from "antd"
import {getAllCourse} from "../../api/menu-api";
import {addQuestion, updateQuestion} from "../../api/question-api";
import RichTextEdit from "./rich-text-editor"

const {Item} = Form
const {Option} = Select
const {TextArea} = Input

class AddEditQuestion extends Component {

    constructor(props) {
        super(props)

        this.answerRef = React.createRef()
    }

    state = {
        allCourse: [],
        currentCourse: this.props.location.state.currentCourse || {},
        editQuestion: this.props.location.state.editQuestion || {}
    }

    componentDidMount() {
        getAllCourse().then(result => {
            if (result.status === 0) {
                this.setState({
                    allCourse: result.data
                })
            }
        })
    }

    // 0. 学科列表
    // 1. 当前的学科
    // 2. 如果是编辑按钮跳转过来的, 需要被编辑的数据模型

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 3 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
    }

    tailFormItemLayout = {
        wrapperCol: {
            sm: {
                span: 6,
                offset: 3,
            },
        },
    }

    _handlerSubmit = (e) => {
        e.preventDefault()
        let editID = this.state.editQuestion.id;

        this.props.form.validateFields((errors, values)=> {
            if (!errors) {
                const {title, content, categoryID} = values

                // 取出富文本编辑器里面的内容
                let answer = this.answerRef.current.getAnswer()

                if (editID) {
                    console.log("应该是编辑这道题目",editID,  values);
                    updateQuestion(editID, title, content, answer, categoryID).then(result=>{
                        if (result.status === 0) {
                            message.success("更新成功")
                            this.props.history.goBack();
                        }  else {
                            message.error("更新失败")
                        }
                    })
                } else {
                    console.log("新增题目", values);
                    addQuestion(title, content, answer, categoryID).then(result=>{
                        if (result.status === 0) {
                            message.success("新增成功")
                            this.props.history.goBack();
                        }  else {
                            message.error("新增失败")
                        }
                    })
                }
            }
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form

        let addOrEdit = this.state.editQuestion.id ? "-编辑":"-新增"
        // console.log(title);
        let title = this.state.currentCourse.title + addOrEdit;
        return (
            <Card title={title} >

                <Form {...this.formItemLayout} onSubmit={this._handlerSubmit}>
                    <Item label={"所属学科"}>
                        {getFieldDecorator("categoryID", {
                            rules: [
                                {required: true, message: "必填"}
                            ],
                            initialValue: this.state.currentCourse.id
                        })(
                            <Select>
                                {this.state.allCourse.map(item=> {
                                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                                })}
                            </Select>
                        )}

                    </Item>

                    <Item label={"题目标题"}>
                        {getFieldDecorator("title", {
                            rules: [
                                {required: true, message: "必填"}
                            ],
                            initialValue: this.state.editQuestion.title
                        })(
                            <Input type={"text"} placeholder={"请输入题目标题"}/>
                        )}
                    </Item>

                    <Item label={"题目内容"}>
                            {getFieldDecorator("content", {
                                rules: [
                                    {required: true, message: "必填"}
                                ],
                                initialValue: this.state.editQuestion.content
                            })(
                        <TextArea placeholder={"请输入题目内容"}/>
                            )}
                    </Item>

                    <Item label={"题目答案"} labelCol={{sm: { span: 3 }}} wrapperCol={{sm: { span: 20 }}}>
                        {getFieldDecorator("answer", {
                            initialValue: this.state.editQuestion.answer
                        })(
                            <RichTextEdit ref={this.answerRef}/>
                        )}
                    </Item>


                    <Item {...this.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button onClick={() => {
                            this.props.history.goBack()
                        }}>
                            取消
                        </Button>
                    </Item>

                </Form>


            </Card>
        )
    }
}


export default Form.create()(AddEditQuestion)
