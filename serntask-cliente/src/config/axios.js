import axios from 'axios' 

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // timeout: ,
    // headers: 
})

export default axiosClient 