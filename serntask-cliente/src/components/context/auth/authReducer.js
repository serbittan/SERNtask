import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
} from '../../types'



const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return { 
                ...state,
                // token: null,
                authenticated: null,
                registered: true
            }

        case REGISTER_FAILED:
            return {
                ...state,
                message: action.payload
            }

        case LOGIN_SUCCESS:
            // guardamos token.
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                registered: true,
                authenticated: true,
                message: null
            }

        case LOGIN_FAILED:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                authenticated: null,
                message: action.payload
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state
    }
}

export default authReducer