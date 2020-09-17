import axiosClient from '../config/axios'

const login = data => {
    return (async () => {
        const response = axiosClient.post('/users/auth', data)

        return response
    })()
}

export default login