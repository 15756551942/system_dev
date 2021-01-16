import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu } from 'antd';

import './index.css'
import logo from '../../assets/images/logo512.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            } else {
                return <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            }
        })
    }

    render() {
        const path = this.props.location.pathname

        return (
            <div className='left_nav'>
                <Link className='left_nav_header' to='/'>
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </Link>
                <Menu mode="inline" theme="dark" selectedKeys={[path]}>
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)