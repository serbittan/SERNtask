import React, { useReducer } from 'react'
import { alertContext, alertReducer } from '.'

import {
    SHOW_ALERT, 
    HIDDEN_ALERT
} from '../../types'

const AlertState = ({ children }) => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState)

    const showAlert = (msg, category) => {
        const alert = {
            msg,
            category
        }
        dispatch({
            type: SHOW_ALERT,
            payload: alert
        })

        setTimeout(() => {
            dispatch({
                type: HIDDEN_ALERT
            })
        }, 3000)
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}>
            { children }
        </alertContext.Provider>
    )
}

export default AlertState