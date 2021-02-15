import React, { Component } from 'react'
import {Modal} from 'antd'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

import './index.css'
import logo from '../../assets/images/logo192.png'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../../components/link_button'
import {reset_user} from '../../redux/actions'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: '',
    }
    getTime = () => {
        this.t = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000);
    }
    getWeather = () => {
        reqWeather().then((result) => {
            this.setState({weather:result})
        })
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key === path){
                title = item.title
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }
    quitLogin = () => {
        Modal.confirm({
            content:'确定退出吗？',
            onOk:() => {
                this.props.reset_user()
                this.props.history.replace('/login')
            }
        })
    }
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount(){
        clearTimeout(this.t)
    }
    render() {
        const {currentTime,weather} = this.state
        const {headTitle,user} = this.props
        
        return (
            <div className='header'>
                <div className='header_top'>
                    <span>欢迎，{user?user.username:''}</span>
                    <LinkButton onClick={this.quitLogin}>退出</LinkButton>
                </div>
                <div className='header_bottom'>
                    <div className='header_bottom_left'>{headTitle}</div>
                    <div className='header_bottom_right'>
                        <span>{currentTime}</span>
                        <img src={logo} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({headTitle:state.headTitle,user:state.user}),
    {reset_user}
)(withRouter(Header))