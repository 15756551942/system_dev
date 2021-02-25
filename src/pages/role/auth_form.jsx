import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'

import menuList from '../../config/menuConfig'

export default class AuthForm extends Component {
    // getTreeData = (menuList) => {
    //     return menuList.reduce((pre,item) => {
    //         pre.push(item)
    //         return pre
    //     },[])
    // }
    // UNSAFE_componentWillMount() {
    //     this.treeData = this.getTreeData(menuList)
    // }
    render() {
        const { role } = this.props
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
                />
            </div>
        )
    }
}