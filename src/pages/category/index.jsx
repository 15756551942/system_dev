import React, { Component } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { PlusOutlined, RightOutlined } from '@ant-design/icons'

import { reqCategorys } from '../../api'
import LinkButton from '../../components/link_button'
import AddForm from './add_form'
import UpdateForm from './update_form'

export default class Category extends Component {
    state = {
        isLoading: false,
        categorys: [],
        subCategorys: [],
        parentId: '0',
        parentName: '',
        showStatus: 0
    }
    initColums = () => {
        this.columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: (category) => (
                    <span>
                        <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>
                        {
                            this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubcategorys(category) }}>查看子分类</LinkButton> : null
                        }
                    </span>
                ),
                width: 300
            }
        ];
    }
    getCategorys = () => {
        let { parentId } = this.state
        this.setState({ isLoading: true })
        reqCategorys(parentId).then((result) => {
            this.setState({ isLoading: false })
            if (result.data.status === 0) {
                if (parentId === '0') {
                    this.setState({ categorys: result.data.data })
                } else {
                    this.setState({ subCategorys: result.data.data })
                }
            } else {
                message.error('获取分类列表失败')
            }
        })
    }
    showSubcategorys = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => {
            this.getCategorys()
        })
    }
    showCategorys = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    }
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }
    showAdd = () => {
        this.setState({
            showStatus:1
        })
    }
    addCategory = () => {
        
    }
    showUpdate = () => {
        this.setState({
            showStatus:2
        })
    }
    updateCategory = () => {
        
    }
    UNSAFE_componentWillMount() {
        this.initColums()
    }
    componentDidMount() {
        this.getCategorys()
    }
    render() {
        const { categorys, isLoading, subCategorys, parentId, parentName,showStatus } = this.state
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <RightOutlined style={{ marginRight: 5 }} />
                <span>{parentName}</span>
            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAdd}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={parentId === '0' ? categorys : subCategorys}
                    columns={this.columns}
                    bordered
                    rowKey='_id'
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                    loading={isLoading}
                />
                <Modal title="添加分类" visible={showStatus === 1} onOk={this.addCategory} onCancel={this.handleCancel}>
                    <AddForm />
                </Modal>
                <Modal title="更新分类" visible={showStatus === 2} onOk={this.updateCategory} onCancel={this.handleCancel}>
                    <UpdateForm />
                </Modal>
            </Card>
        )
    }
}