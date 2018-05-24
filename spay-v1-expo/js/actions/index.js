import * as action from '../constants/ActionType';
import * as middleware from './middleware';


export const loadingIndicators = (value) => {
    return { type: action.UPDATE_LOADING_STATE, value }
}

export const showToastMessage = (value, duration) => {
    return dispatch => {
        dispatch ({ type: action.SHOW_TOAST, value })
        return middleware.anim(22, duration,()=>{
            dispatch (hideToastMessage())
        })
    }
}

export const hideToastMessage = () => {
    return dispatch => {
        middleware.anim(-52, 10,()=>{
            dispatch ({ type: action.HIDE_TOAST })
        })
    }
}

export const setAccessToken = (value) => {
    return { type: action.UPDATE_ACCESS_TOKEN, value }
}

export const setAccountInfo = (value) => {
    return { type: action.UPDATE_ACC, value }
}

export const setBalance = (value) => {
    return { type: action.UPDATE_BALANCE, value }
}

export const newMessage = (value) => {
    return { type: action.NEW_MESSAGE, value }
}

