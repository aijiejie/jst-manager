import React, {Component} from "react"
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

export default class RichTextEdit extends Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.value)
    }

    // 如果想获取富文本编辑器里面的内容
    getAnswer = () => {
        // console.log("从富文本编辑器里面, 获取到的数据", this.state.editorState.toHTML());
        return this.state.editorState.toHTML()
    }


    handlerOnChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    editorControls = [
        'undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator',
        'media', 'separator',
        'clear'
    ]

    render() {
        const {editorState} = this.state
        return (
            <BraftEditor
                value={editorState}
                style={{border: "1px solid gold"}}
                onChange={this.handlerOnChange}
                controls={this.editorControls}
            />
        )
    }
}
