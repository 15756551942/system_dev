import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'
import { Menu } from 'antd';

import './index.css'
import logo from '../../assets/images/logo512.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu
class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={item.icon}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            } else {
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    this.openKey = item.key
                }
                return <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        const path = this.props.location.pathname
        const openKey = this.openKey

        return (
            <div className='left_nav'>
                <Link className='left_nav_header' to='/'>
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </Link>
                <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)