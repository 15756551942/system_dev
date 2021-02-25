import React,{Component} from 'react'
import {Form,Input} from 'antd'

export default class AddRole extends Component {
    state = {
        roleName:''
    }

    getRoleName = () => {
        return this.state.roleName
    }

    render() {
        return (
            <Form>
                <Form.Item label='角色名称'>
                    <Input placeholder='请输入角色名称' onInput={(event) => this.setState({roleName:event.target.value})}></Input>
                </Form.Item>
            </Form>
        )
    }
}