import React,{Component} from 'react'
import {Form,Select,Input} from 'antd'

export default class AddForm extends Component {
    onFinish = (values) => {
        console.log(values)
    }

    render() {
        return (
            <Form>
                <Form.Item initialValue='一级分类'>
                    <Select>
                        <Select.Option>一级分类</Select.Option>
                        <Select.Option>图书</Select.Option>
                        <Select.Option>电脑</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item initialValue=''>
                    <Input></Input>
                </Form.Item>
            </Form>
        )
    }
}