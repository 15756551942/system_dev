import React, { Component } from 'react'
import { Card, Form, Input, Button  } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import CasCader from '../../components/cascader'
import PictureWall from './pictures_wall'
import RichTextEditor from './rich_text_editor'

export default class ProductAddUpdate extends Component {
    onFinish = (values) => {

    }
    render() {
        const layout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 },
        }
        const title = (
            <span>
                <ArrowLeftOutlined style={{ color: 'green', fontSize: 20, marginRight: 15 }} onClick={() => this.props.history.goBack()} />
                <span>添加商品</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form {...layout}>
                    <Form.Item
                        initialValue=''
                        label='商品名称'
                        required
                        rules={[{required:true,message:'必须输入商品名称'}]}
                    >
                        <Input placeholder='请输入商品名称'></Input>
                    </Form.Item>
                    <Form.Item
                        initialValue='' 
                        label='商品描述'
                        required
                        rules={[{required:true,message:'必须输入商品描述'}]}
                    >
                        <Input.TextArea autoSize placeholder='请输入商品描述'></Input.TextArea>
                    </Form.Item>
                    <Form.Item
                    initialValue='' 
                    label='商品价格'
                    required
                    rules={[{required:true,message:'必须输入商品价格'}]}
                    >
                        <Input type='number' placeholder='请输入商品价格' addonAfter='元'></Input>
                    </Form.Item>
                    <Form.Item label='商品分类'>
                        <CasCader />
                    </Form.Item>
                    <Form.Item label='商品图片'>
                        <PictureWall />
                    </Form.Item>
                    <Form.Item label='商品详情' labelCol={{span:2}} wrapperCol={{span:20}}>
                        <RichTextEditor />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary'>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}