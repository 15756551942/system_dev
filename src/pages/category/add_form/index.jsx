import React,{Component} from 'react'
import {Form,Select,Input} from 'antd'

export default class AddForm extends Component {
    render() {
        return (
            <Form>
                <Form.Item initialValue='1'>
                    <Select>
                        <Select.Option value='1'>1</Select.Option>
                        <Select.Option value='2'>2</Select.Option>
                        <Select.Option value='3'>3</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input></Input>
                </Form.Item>
            </Form>
        )
    }
}