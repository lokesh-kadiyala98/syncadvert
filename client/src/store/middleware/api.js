import axios from 'axios'

import { apiCallBegan, apiCallSuccess, apiCallFailed } from './../api';

const api = ({ dispatch, getState }) => next => async action => {
    if (action.type !== apiCallBegan.type)
        return next(action)
    
    const { url, method, data, onStart, onSuccess, onError } = action.payload
    
    if (onStart)
        dispatch({ type: onStart })
        
    next(action)
    
    try {
        let response

        if (method === 'get') {
            response = await axios.request({
                url,
                method,
                params: data
            })
        } else {
            response = await axios.request({
                url,
                method,
                data
            })
        }

        dispatch(apiCallSuccess(response.data))
        
        if (onSuccess)
            dispatch({ 
                type: onSuccess,
                payload: response.data
            })
    } catch (error) {
        if (error.response) {
            const {message} = error.response.data
            dispatch(apiCallFailed(message))
            
            if (onError)
                dispatch({
                    type: onError,
                    payload: message
                })
        } else if (!error.response) {
            const message = 'Unexpected Error Occured. Check Internet Connectivity.'
            dispatch(apiCallFailed(message))
        }
    }
}

export default api