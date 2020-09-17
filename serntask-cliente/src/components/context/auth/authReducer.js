import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    CLOSE_SESSION,
    CLEAN_MESSAGE
} from '../../types'



const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS:
            return { 
                ...state,
                token: null,
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
                token: action.payload.token,
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
                registered: true,
                authenticated: true,
                user: action.payload
            }

        case CLOSE_SESSION:
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                token: null,
                message: action.payload,
                authenticated: null,
                registered: null
            }

            case CLEAN_MESSAGE:
            return {
                ...state,
                message: null
            }

        default:
            return state
    }
}

export default authReducer