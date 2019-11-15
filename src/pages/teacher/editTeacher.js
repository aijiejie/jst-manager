import React, {Component} from "react"
import {Modal, Form, Input, Select, message} from "antd";
import {getMenuListWithParentID, updateMenu} from "../../api/menu-api";

const {Item} = Form;
const {Option} = Select;

class EditMenu extends Component {

    state = {
        menuList: []
    }

    handleOk = e => {
        console.log(e);

        this.props.form.validateFields((error, values) => {
            if (!error) {
                console.log("收集的表单数据", values);
                const {id, title, _key, icon, parentID} = values
                console.log({id, title, _key, icon, parentID}, "----")
                // 要更新菜单
                // 和服务器提供给我们的接口, 对比
                updateMenu(id, title, _key, icon, parentID).then(result=> {
                    if (result.status === 0) {
                        message.success("菜单数据更新成功")
                        this.props.hideFunc()
                        window.location.reload()
                    }else {
                        message.error("菜单更新失败")
                    }

                })
            }
        })
        //
    };

    handleCancel = e => {
        console.log(e);
        this.props.hideFunc()
    };


    componentDidMount() {
        getMenuListWithParentID().then(result => {
            if (result.status === 0) {
                this.setState({
                    menuList: result.data.map(item => {
                        return {id: item.id, title: item.title}
                    })
                })
            }
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form;
        let editMenu = this.props.editMenu;
        return (
            <Modal
                title="编辑"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText={"更新"}
                cancelText={"取消"}
            >

                <Form>

                    <Item>
                        {getFieldDecorator("id", {
                            initialValue: editMenu.id
                        })(
                            <Input type={"hidden"}/>
                        )}
                    </Item>

                    <Item>
                        {getFieldDecorator("parentID", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                            initialValue: editMenu.parentID
                        })(
                            <Select>
                                <Option value={0} key={0}>一级菜单</Option>
                                {this.state.menuList.map(item => {
                                    if (item.id === editMenu.id) return ""
                                    return <Option value={item.id} key={item.id}>{item.title}</Option>
                                })}
                            </Select>
                        )}
                    </Item>

                    <Item>
                        {getFieldDecorator("title", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                            initialValue: editMenu.title
                        })(
                            <Input type={"text"} placeholder={"请输入菜单的名称"}/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("_key", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                            initialValue: editMenu._key
                        })(
                            <Input type={"text"} placeholder={"请输入菜单的路由"}/>
                        )}
                    </Item>
                    <Item>
                        {getFieldDecorator("icon", {
                            rules: [
                                {required: true, message: "此项必须填写"}
                            ],
                            initialValue: editMenu.icon
                        })(
                            <Input type={"text"} placeholder={"请输入菜单的图标"}/>
                        )}
                    </Item>
                </Form>

            </Modal>
        )
    }
}

export default Form.create()(EditMenu)
