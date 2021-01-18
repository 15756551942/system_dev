import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Layout } from 'antd'

import Home from '../../pages/home'
import Category from '../../pages/category'
import Product from '../../pages/product'
import Role from '../../pages/role'
import User from '../../pages/user'
import Bar from '../../pages/charts/bar'
import Line from '../../pages/charts/line'
import Pie from '../../pages/charts/pie'
import Header from '../../components/header'
import LeftNav from '../../components/left_nav'
const { Footer, Content, Sider } = Layout

export default class Admin extends Component {
    render() {
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{backgroundColor:'white',margin:'20px'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}