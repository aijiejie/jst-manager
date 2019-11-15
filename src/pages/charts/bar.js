import React, {Component} from "react"
import {Card} from "antd"
import ReactEcharts from 'echarts-for-react'
import {connect} from "react-redux";

class Bar extends Component {

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
                type: 'bar'
            }]
        }
    }
    getOption2 = (question_data=[]) => {
        return {
            title: {
                text: '撩课-题目统计',
                subtext: '学科题目统计'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['真的', '假的']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: question_data.map(item=>item.title)
            },
            series: [
                {
                    name: '真的',
                    type: 'bar',
                    data: question_data.map(item=>item.question_count)
                },
                {
                    name: '假的',
                    type: 'bar',
                    data: question_data.map(item=>item.question_count+3)
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

export default connect((state)=>({question_msg: state}), {})(Bar)
