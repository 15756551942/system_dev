import React, { Component } from 'react'
import { Card, Select, Input, Button, Table,message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/link_button'
import { reqProducts, reqSearchProducts,reqUpdateStatus } from '../../api'

export default class ProductHome extends Component {
    state = {
        product: [],
        total: 0,
        searchType: 'productName',
        searchName: ''
    }
    initColumns() {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc'
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                render: (product) => {
                    const {status,_id} = product
                    const newStatus = status===1?2:1
                    return (
                        <span>
                            <Button type='primary' onClick={() => this.updateStatus(_id,newStatus)} >{status===1?'下架':'上架'}</Button>
                            <span>{status===1?'在售':'已下架'}</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={() => this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            }
        ];
    }
    getProducts = (pageNum) => {
        this.pageNum = pageNum
        const { searchName, searchType } = this.state
        if (searchName) {
            reqSearchProducts(pageNum, 3, searchType, searchName).then((result) => {
                if (result.data.status === 0) {
                    const { total, list } = result.data.data
                    this.setState({
                        total: total,
                        product: list,
                    })
                }
            }, (reason) => {
                console.log(reason)
            })
        } else {
            reqProducts(pageNum, 3).then((result) => {
                if (result.data.status === 0) {
                    const { total, list } = result.data.data
                    this.setState({
                        total: total,
                        product: list,
                    })
                }
            }, (reason) => {
                console.log(reason)
            })
        }
    }
    updateStatus = async (productId,status) => {
        let result = await reqUpdateStatus(productId,status)
        if(result.data.status === 0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum)
        }
    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const { product, total, searchType, searchName } = this.state
        const title = (
            <span>
                <Select value={searchType} onChange={value => this.setState({ searchType: value })} >
                    <Select.Option value='productName'>按名称搜索</Select.Option>
                    <Select.Option value='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={e => this.setState({ searchName: e.target.value })}
                ></Input>
                <Button type='primary' onClick={() => this.getProducts(1)} >搜索</Button>
            </span>
        )
        const extra = (
            <Button icon={<PlusOutlined />} type='primary' onClick={() => this.props.history.push('/product/addupdate')} >添加商品</Button>
        )
        return (
            <Card title={title} extra={extra} >
                <Table
                    dataSource={product}
                    columns={this.columns}
                    rowKey='_id'
                    bordered
                    pagination={{
                        total,
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}