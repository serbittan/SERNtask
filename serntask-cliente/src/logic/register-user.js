import axiosClient from '../config/axios'

const registerUser = (data) => {
    const { name, email, password, confirm } = data

    // if (!name.trim()) throw new Error('Name is required')
    // if (!email.trim()) throw new Error('email is required')
    // if (!password.trim()) throw new Error('password is required')
    // if (!confirm.trim()) throw new Error('confirm is required')
    // if (password.length < 6) throw new Error('the password must have a minimum of 6 characters')
    // if (password !== confirm) throw new Error('Password and Confirm should be equals')


    return (async () => {
        const response = await axiosClient.post('/users', data)

        return response
    })()
}

export default registerUser