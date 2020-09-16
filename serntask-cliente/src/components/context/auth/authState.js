import React, { useReducer } from 'react'
import { authReducer, authContext } from '.'
import { registerUser, login, retrieveUser } from '../../../logic'
import tokenAuth from '../../../config/token-auth'

import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../../types'


const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        user: null,
        registered: null,
        authenticated: null,
        message: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // Function que registra el usuario.
    const handleRegisterUser = (data) => {
        (async () => {
            try {
                const response = await registerUser(data)
                dispatch({
                    type: REGISTER_SUCCESS,
                    // payload: 
                })
            } catch (error) {
                const alert = {
                    msg: error.response.data,
                    category: 'alert.error'
                }
                dispatch({
                    type: REGISTER_FAILED,
                    payload: alert
                })
            }
        })()
    }

    // Function que loguea al usuario.
    const handleLogin = data => {
        (async () => {
            try {
                const response = await login(data)

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.data
                })
                // nos traemos al usuario que ya tendrá el token
                handleRetrieveUser()

            } catch (error) {
                const alert = {
                    msg: error.response.data.msg,
                    category: 'alert-error'
                }
                dispatch({
                    type: LOGIN_FAILED,
                    payload: alert
                })
            }
        })()

    }

    // Function que me trae la info del usuario registrado.
    const handleRetrieveUser = () => {
        (async () => {
            // Asociar el token al header de la petición para que en api pueda authenticar.
            const token = localStorage.getItem('token')
            if (token) {
                tokenAuth(token)
            }

            try {
                const response = await retrieveUser()

                dispatch({
                    type: GET_USER,
                    payload: response.data
                })
            } catch (error) {
                console.log(error.response)
            }
        })()
    }






    return (
        <authContext.Provider
            value={{
                token: state.token,
                user: state.user,
                registered: state.registered,
                authenticated: state.authenticated,
                message: state.message,
                handleRegisterUser,
                handleLogin,
                handleRetrieveUser
            }}>
            {children}
        </authContext.Provider>
    )
}

export default AuthState