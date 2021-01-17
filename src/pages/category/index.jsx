import React, { Component } from 'react'
import { Card, Table, Button,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import {reqCategorys} from '../../api'

export default class Category extends Component {
    state = {
        isLoading:false,
        categorys:[]
    }
    initColums = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: () => (
                    <span>
                        <a href=':;'>修改分类</a>
                        <a href=':;'>查看子分类</a>
                    </span>
                ),
                width: 300
            }
        ];
    }
    getCategorys = () => {
        this.setState({isLoading:true})
        reqCategorys('0').then((result) => {
            this.setState({isLoading:false})
            if(result.data.status === 0){
                this.setState({categorys:result.data.data})
            }else{
                message.error('获取分类列表失败')
            }
        })
    }
    UNSAFE_componentWillMount() {
        this.initColums()
    }
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        const {categorys,isLoading} = this.state
        const title = '一级分类列表'
        const extra = (
            <Button type='primary'>
                <PlusOutlined />
                添加
            </Button>
        )
        
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={categorys}
                    columns={this.columns}
                    bordered
                    rowKey='_id'
                    pagination={{defaultPageSize:12,showQuickJumper:true}}
                    loading={isLoading}
                />
            </Card>
        )
    }
}