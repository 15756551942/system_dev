import { SET_HEAD_TITLE, SET_USER,RESET_USER } from './action_types'
import { reqLogin } from '../api'
import { message } from 'antd'

export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

export const set_user = (user) => ({ type: SET_USER, payload: user })

export const reset_user = () => ({type:RESET_USER})

export const login = (user,history) => {
    return dispatch => {
        reqLogin(user).then(result => {
            if (result.data.status === 0) {
                message.success('登录成功')
                console.log(result.data.data)
                dispatch(set_user(result.data.data))
                history.replace('/home')
            }else {
                message.error(result.msg)
            }
        }, reason => {

        })
    }
}