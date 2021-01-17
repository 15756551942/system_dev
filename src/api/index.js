import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'

const BASE = 'http://120.55.193.14:5000'

export const reqLogin = (user) => ajax(BASE + '/login', user, 'POST')
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update',{categoryId, categoryName},'POST')

export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=a825f7955b2d077376e794a03a91d565&city=510100'
        jsonp(url, {}, (err, data) => {
            if (data.status === '1') {
                const { weather } = data.lives[0]
                resolve(weather)
            } else {
                message.error('获取天气信息失败')
            }
        })
    })
}