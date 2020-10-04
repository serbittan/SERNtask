import axiosClient from '../config/axios'

const registerUser = (data) => {
    return (async () => {

        const response = await axiosClient.post('/users', data)

        return 
    })()
}

export default registerUser