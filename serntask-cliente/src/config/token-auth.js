// Creamos la función que pasará el token por headers para efectuar las peticiones http.

import axiosClient from './axios'

const tokenAuth = token => {
    if (token) {
        axiosClient.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axiosClient.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth