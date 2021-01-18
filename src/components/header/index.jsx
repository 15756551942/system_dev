import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

import './index.css'
import logo from '../../assets/images/logo192.png'
import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import menuList from '../../config/menuConfig'
import LinkButton from '../../components/link_button'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: '',
    }
    getTime = () => {
        setInterval(() => {
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
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    render() {
        const {currentTime,weather} = this.state
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header_top'>
                    <span>欢迎，admin</span>
                    <LinkButton>退出</LinkButton>
                </div>
                <div className='header_bottom'>
                    <div className='header_bottom_left'>{title}</div>
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

export default withRouter(Header)