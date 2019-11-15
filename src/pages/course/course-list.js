import React, {Component} from "react"
import {deleteQuestion, getCategory, getQuestion} from "../../api/question-api";
import {Card, Button, Table, Divider, Popconfirm, message, Modal} from "antd"
export default class QuestionList extends Component {


    state = {
        currentCourse: {},
        questionList: [],
        isLoading: false,
        totalSize: 0,
        pageSize: 0,
        visible: false,
        showQuestion: {}
    }

    // 根据课程的id< 以及页码, 页尺寸, 获取对应的题目列表, (state)
    _getQuestionList =  async (id, pageNum=1, pageSize=3) => {
        this.setState({
            isLoading: true
        })
        // 异步的发请求, promise对象. then -> result 以返回值的形式
        let question_result = await getQuestion(id, pageNum, pageSize)
        if (question_result.status === 0) {
            // console.log("题目数据", question_result.data);
            this.setState({
                questionList: question_result.data,
                totalSize: question_result.totalSize,
                pageSize: question_result.pageSize
            })
        }
        this.setState({
            isLoading: false
        })
    }

    _getCourse = async (path) => {
        // 1. 发请求, 获取path对应的课程信息(id, title)
        // id: 需要根据这个id< 发送请求, 获取题目列表
        // title: y用来展示
        let result = await getCategory(path)
        if (result.status === 0) {
            // console.log("根据路径获取到了课程信息", result.data);
            this.setState({
                currentCourse: result.data[0]
            })

            let id = result.data[0].id
            this._getQuestionList(id)
        }
    }

    componentDidMount() {
        let path = this.props.location.pathname
        this._getCourse(path)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let path = nextProps.location.pathname;
        this._getCourse(path)
    }

    // 列的配置信息
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
        },
        {
            title: '题目标题',
            dataIndex: 'title',
            key: 'title',
            align: "center",
        },
        {
            title: '题目内容',
            dataIndex: 'content',
            key: 'content',
            align: "center",
        },
        {
            title: '所属学科',
            dataIndex: 'categoryTitle',
            key: 'categoryTitle',
            align: "center",
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            width: 300,
            render: (text, record) => {
                return (
                    <span>
                        <Button onClick={()=>this._showAnswer(record)}>查看答案</Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{
                            this.props.history.push("/question/add-edit", {
                                currentCourse: this.state.currentCourse,
                                editQuestion: record
                            })
                        }}>编辑</Button>
                        <Divider type="vertical" />

                        <Popconfirm
                            title="确认要删除这一个题目吗?"
                            onConfirm={()=> {
                                console.log("真的要删除", record);
                                deleteQuestion(record.id).then(result=>{
                                    if (result.status === 0) {
                                        message.success(result.msg)
                                        this._getQuestionList(this.state.currentCourse.id)
                                    }else {
                                        message.error("删除失败")
                                    }
                                })

                              }}
                            okText="like删除"
                            cancelText="考虑一下"
                        >
                        <Button type={"danger"}>删除</Button>
                        </Popconfirm>
                    </span>
                )
            }
        },
    ];

    _showAnswer = (record)=> {

        // 把数据渲染到modal窗口身上
        this.setState({
            showQuestion: record
        })

        // 让窗口弹出来
        this.setState({
            visible: true
        })
    }

    render() {

        let addBtn = (<Button type={"primary"} onClick={()=>{
            this.props.history.push("/question/add-edit", {currentCourse: this.state.currentCourse})
        }
        }>添加题目</Button>)

        return (
            <Card title={this.state.currentCourse.title} extra={addBtn} >
                <Table dataSource={this.state.questionList} columns={this.columns} rowKey={"id"} bordered={true} loading={this.state.isLoading} pagination={{
                    total: this.state.totalSize,
                    pageSize: this.state.pageSize,
                    onChange: (pageNum, pageSize) => {
                        console.log("需要加载第" + pageNum, pageSize);
                        this._getQuestionList(this.state.currentCourse.id, pageNum, pageSize)
                    }
                }}/>

                <Modal
                    title={this.state.showQuestion.title}
                    visible={this.state.visible}
                    onOk={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                >
                    <div dangerouslySetInnerHTML={{
                        __html: this.state.showQuestion.answer
                    }}/>
                </Modal>


            </Card>
        )
    }
}
