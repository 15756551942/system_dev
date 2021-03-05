import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'

import menuList from '../../config/menuConfig'

export default class AuthForm extends Component {
    constructor(props){
        super(props)
        let {menus}=this.props.role
        this.state={
            checkedKeys:menus
        }
    }
    onCheck = checkedKeys => {
        this.setState({checkedKeys})
    }
    getMenus = () => this.state.checkedKeys
    UNSAFE_componentWillReceiveProps(nextProps) {
        let menus = nextProps.role.menus
        this.setState({checkedKeys:menus})
    }
    render() {
        const { role } = this.props
        const {checkedKeys} = this.state
        const treeData = [
            {
                title:'平台权限',
                key:'power',
                children:menuList
            }
        ]
        return (
            <div>
                <Form>
                    <Form.Item label='设置角色权限'>
                        <Input value={role.name} disabled ></Input>
                    </Form.Item>
                </Form>
                <Tree 
                    checkable
                    defaultExpandAll={true}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                />
            </div>
        )
    }
}