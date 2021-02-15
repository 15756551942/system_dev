import React, { Component } from 'react'
import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'

import {reqCategory} from '../../api'

export default class ProductDetail extends Component {
    state = {
        cName1:'',
        cName2:''
    }
    async componentDidMount() {
        const {categoryId,pCategoryId} = this.props.location.state
        
        if(pCategoryId === '0'){
            const result = await reqCategory(categoryId)
            console.log(result)
            const cName1 = result.data.name
            this.setState({
                cName1
            })
        }else{
            const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            console.log(results)
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }
    render() {
        const { name, desc, price, detail, imgs,cName1,cName2 } = this.props.location.state.product
        const title = (
            <span>
                <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product_detail'>
                <List>
                    <List.Item>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品价格：</span>
                        <span>{price}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>所属分类：</span>
                        <span>{cName1} {cName2 ? '-->' + cName2 : ''}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        src={img}
                                        alt="img"
                                        className='product_img'
                                    />
                                ))
                            }
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </List.Item>
                </List>
            </Card>
        )
    }
}