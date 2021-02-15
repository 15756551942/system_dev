import React,{Component} from 'react'
import {Form,Input} from 'antd'

export default class UpdateForm extends Component {
    onFinish = (values) => {
        console.log(values)
    }

    render() {
        const {categoryName} = this.props
        return (
            <Form>
                <Form.Item initialValue={categoryName}>
                    <Input></Input>
                </Form.Item>
            </Form>
        )
    }
}