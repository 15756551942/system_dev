import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import LinkButton from '../../components/link_button'
import { reqProducts, reqSearchProducts } from '../../api'

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
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
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
            <Button icon={<PlusOutlined />} type='primary'>添加商品</Button>
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