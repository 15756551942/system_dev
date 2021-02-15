import {combineReducers} from 'redux'

import {SET_HEAD_TITLE,SET_USER,RESET_USER} from './action_types'

const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action) {
    switch(action.type){
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

const initUser = {}
function user(state=initUser,action) {
    switch(action.type){
        case SET_USER:
            return action.payload
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})