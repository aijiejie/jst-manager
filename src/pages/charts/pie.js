import React, {Component} from "react"
import {Card} from "antd"
import ReactEcharts from 'echarts-for-react'
import {connect} from "react-redux";

// UI组件
class Pie extends Component {
    getOption = (question_data=[]) => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: question_data.map(item=>item.title)
            },
            series: [
                {
                    name:'题目个数分析',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: question_data.map(item=>({value: item.question_count, name: item.title}))
                }
            ]
        }
    }
    getOption2 = (question_data=[]) => {
        return {
            title : {
                text: '撩课-题目个数统计',
                subtext: '真实可靠',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x : 'center',
                y : 'bottom',
                data:question_data.map(item=>item.title)
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'半径模式',
                    type:'pie',
                    radius : [20, 110],
                    center : ['25%', '50%'],
                    roseType : 'radius',
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    lableLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:question_data.map(item=>({value: item.question_count, name: item.title}))
                },
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [30, 110],
                    center : ['75%', '50%'],
                    roseType : 'area',
                    data:question_data.map(item=>({value: item.question_count, name: item.title}))
                }
            ]
        }
    }
    render() {
        return (
            <Card title="题目统计">
                <ReactEcharts option={this.getOption2(this.props.question_msg)} />
            </Card>
        )
    }
}

// 容器组件: 负责将数据, 连接到UI组件身上
// 容器组件的执行, 需要有store对象, store对象一般在APP中, 直接通过Provider传递过来
export default connect((state)=>({question_msg: state}))(Pie)
