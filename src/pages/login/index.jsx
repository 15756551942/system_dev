import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { connect } from 'react-redux'
import {login} from '../../redux/actions'
import './index.css'

class Login extends Component {
    onFinish = (values) => {
        this.props.login(values,this.props.history)
    };

    render() {
        return (
            <div className='login_page clearfix'>
                <div className='form_out'>
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: 'Please input your Username!', },
                                { min: 4, message: '用户名不少于4位' },
                                { max: 12, message: '用户名不大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                            ]}
                            initialValue='admin' 
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your Password!', },
                                { min: 4, message: '用户名不少于4位' },
                                { max: 12, message: '用户名不大于12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
                            ]}
                            initialValue='admin'
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >Log in</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({id:state.user}),
    {login}
)(Login)