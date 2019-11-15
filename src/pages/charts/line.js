import React, {Component} from "react"
import {Card} from "antd"
import ReactEcharts from 'echarts-for-react'
import {connect} from "react-redux";

class Line extends Component {

    getOption = (question_data=[]) => {
        return {
            xAxis: {
                type: 'category',
                data: question_data.map(item=>item.title)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: question_data.map(item=>item.question_count),
                type: 'line',
                symbol: 'triangle',
                symbolSize: 20,
                lineStyle: {
                    normal: {
                        color: 'green',
                        width: 4,
                        type: 'dashed'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'yellow',
                        color: 'blue'
                    }
                }
            }]
        }
    }
    getOption2 = (question_data=[]) => {
        return {
            title: {
                text: '撩课-学科题目统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:question_data.map(item=>item.title)
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: question_data.map(item=>item.title)
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'Step Start',
                    type:'line',
                    step: 'start',
                    data:question_data.map(item=>item.question_count)
                }
            ]
        }
    }

    render() {
        return (
            <Card title="题目统计">
                <ReactEcharts option={this.getOption2(this.props.question_msg)} />
                <ReactEcharts option={this.getOption(this.props.question_msg)} />
            </Card>
        )
    }
}

export default connect((state)=>({question_msg: state}))(Line)
