import ajax from './ajax'

const BASE = 'http://120.55.193.14:5000'

export const reqLogin = (user) => ajax(BASE + '/login',user,'POST')